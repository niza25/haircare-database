import React, { Component, Fragment } from "react";
import { Header, Footer } from "./layouts";
import Categories from "./categories";
import { categories, careTipps } from "../store";

export default class extends Component {
  state = {
    careTipps,
    careTipp: {}
    // if not declared, will be init undefined which is falsy
    /* editMode: false */
  };

  getTippsByCategory = () => {
    const initialCareTipps = categories.reduce(
      (careTipps, cat) => ({
        ...careTipps,
        [cat]: []
      }), {})

    return Object.entries(
      this.state.careTipps.reduce((careTipps, careTipp) => {
        const { category } = careTipp
        
        careTipps[category] = [...careTipps[category], careTipp]

        return careTipps
      }, initialCareTipps)
    );
  };

  handleCategorySelect = category =>
    this.setState({
      category
    });

  handleCareTippSelect = id =>
    this.setState(({ careTipps }) => ({
      careTipp: careTipps.find(tip => tip.id === id),
      editMode: false
    }));

  handleCareTippCreate = careTipp =>
    this.setState(({ careTipps }) => ({
      careTipps: [...careTipps, careTipp]
    }));

  handleCareTippDelete = id =>
    this.setState(({ careTipps, careTipp }) => ({
      careTipps: careTipps.filter(tipp => tipp.id !== id),
      editMode: false,
      careTipp: careTipp.id === id ? {} : careTipp
    }));

  handleCareTippSelectEdit = id =>
    this.setState(({ careTipps }) => ({
      careTipp: careTipps.find(tip => tip.id === id),
      editMode: true
    }));

  handleCareTippEdit = careTipp => {
    this.setState(({ careTipps }) => ({
      careTipps: [...careTipps.filter(tipp => tipp.id !== careTipp.id), careTipp], careTipp
    }));
  };

  render() {
    const careTipps = this.getTippsByCategory(),
      { category, careTipp, editMode } = this.state;
      console.log(careTipps)
    return (
      <Fragment>
        <Header
          categories={categories}
          onCareTippCreate={this.handleCareTippCreate}
        />
        <Categories
          careTipp={careTipp}
          careTipps={careTipps}
          categories={categories}
          category={category}
          onSelect={this.handleCareTippSelect}
          onDelete={this.handleCareTippDelete}
          onSelectEdit={this.handleCareTippSelectEdit}
          editMode={editMode}
          onEdit={this.handleCareTippEdit}
        />
        <Footer
          category={category}
          categories={categories}
          onSelect={this.handleCategorySelect}
        />
      </Fragment>
    );
  }
}
