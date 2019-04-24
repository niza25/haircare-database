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
    return Object.entries(
      this.state.careTipps.reduce((careTipps, careTipp) => {
        const { category } = careTipp;
        careTipps[category] = careTipps[category]
          ? [...careTipps[category], careTipp]
          : [careTipp];

        return careTipps;
      }, {})
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
