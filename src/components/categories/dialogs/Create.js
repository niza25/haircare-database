import React, { Fragment, Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import { Add } from "@material-ui/icons/";

const styles = theme => ({
FormControl: {
  width: 500
},
})

export default withStyles(styles)(class extends Component {
  state = {
    open: false,
    careTipp: {
      title: "",
      description: "",
      category: ""
    }
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      careTipp: {
        ...this.state.careTipp,
        [name]: value
      }
    });
  };

  handleSubmit = () => {
    // to do : validate
    const {careTipp} = this.state
    
    this.props.onCreate({
      ...careTipp,
      id: careTipp.title.toLowerCase().replace(/ /g, '-')
    })
    
    this.setState({
      open: false,
      careTipp:{
        title: "",
        description: "",
        category: ""
      }
    })
  }

  render() {
    const {
      open,
      careTipp: { title, description, category }
    } = this.state;
    const { categories, classes } = this.props

    return (
      <Fragment>
        <Button onClick={this.handleToggle} variant="fab" mini>
          <Add />
        </Button>
        <Dialog open={open} onClose={this.handleToggle}>
          <DialogTitle id="form-dialog-title">
            Create a new care tipp
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below
            </DialogContentText>
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
                <Select
                  value={category}
                  onChange={this.handleChange("category")}
                >
                 {categories.map(cat =>
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  )}
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
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              color="primary"
              variant="raised"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
})
