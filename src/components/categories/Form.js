import React, { Component } from "react";
import {
  withStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";

const styles = theme => ({
  FormControl: {
    width: 300
  }
});

export default withStyles(styles)(
  class extends Component {
    state = this.getInitialState();

    getInitialState() {
      // check where this come from
      const { careTipp } = this.props;

      return careTipp ? careTipp : {
            title: "",
            description: "",
            category: ""
          };
    }

    componentWillReceiveProps({ careTipp }) {
      this.setState({
        ...careTipp
      });
    }

    handleChange = name => ({ target: { value } }) =>
      this.setState({
        [name]: value
      });

    handleSubmit = () => {

      this.props.onSubmit({
        id: this.state.title.toLowerCase().replace(/ /g, "-"),
        ...this.state,
        
      });

      this.setState(this.getInitialState());
    };

    render() {
      const { categories, classes, careTipp } = this.props,
        { title, description, category } = this.state;
      return (
        <form>
          <TextField
            label="Title"
            value={title}
            onChange={this.handleChange("title")}
            margin="normal"
            className={classes.FormControl}
          />
          <br />
          <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="categories">Category</InputLabel>
            <Select value={category} onChange={this.handleChange("category")}>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <TextField
            label="Description"
            value={description}
            multiline
            rows="4"
            onChange={this.handleChange("description")}
            margin="normal"
            className={classes.FormControl}
          />
          <br />
          <Button onClick={this.handleSubmit} color="primary" variant="raised">
            {careTipp ? "Edit" : "Create"}
          </Button>
        </form>
      );
    }
  }
);
