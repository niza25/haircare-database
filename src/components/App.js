import React, { Component, Fragment } from "react";
import { Header, Footer } from "./layouts";
import Categories from "./categories";
import { categories, careTipps } from "../store";

export default class extends Component {
  state = {
    careTipps,
    selectedTipp: {}
  };

  getTippsByCategory = () => {
// create an object with cat, so they dont disappear
const initCategories = categories.reduce((categories, category)=>({
...categories,
[category]: []
}), {})

console.log(initCategories, categories, 'init')

    return Object.entries(
      this.state.careTipps.reduce((careTipps, careTipp) => {
        const { category } = careTipp;
        careTipps[category] = [...careTipps[category], careTipp]

        return careTipps;
        // initCategories so the cat stay even if all tipps deleted
      }, initCategories)
    );
  };

  handleCategorySelect = activeCategory => {
    this.setState({
      activeCategory
    });
  };

  handleTitleSelect = id => {
    this.setState(({ careTipps }) => ({
      selectedTipp: careTipps.find(tip => tip.id === id)
    }));
  };

  handleCareTippCreate = careTipp => {
    this.setState(({ careTipps }) => ({
      careTipps: [...careTipps, careTipp]
    }));
  };

  handleCareTippDelete = id => {
    // previous state careTipps extracted
    this.setState(({ careTipps }) => ({
      careTipps: careTipps.filter(tipp => tipp.id !== id)
    }));
  };

  render() {
    const careTipps = this.getTippsByCategory(),
      { activeCategory, selectedTipp } = this.state;
    return (
      <Fragment>
        <Header
          categories={categories}
          onCareTippCreate={this.handleCareTippCreate}
        />
        <Categories
          careTipps={careTipps}
          activeCategory={activeCategory}
          selectedTipp={selectedTipp}
          onSelect={this.handleTitleSelect}
          onDelete={this.handleCareTippDelete}
        />
        <Footer
          activeCategory={activeCategory}
          categories={categories}
          onSelect={this.handleCategorySelect}
        />
      </Fragment>
    );
  }
}
