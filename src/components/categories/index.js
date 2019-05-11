import React, { Fragment } from "react";
import Form from "./Form";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const styles = {
  Paper: {
    padding: 20,
    margin: 30,
    height: 500,
    overflow: "auto"
  },
  RightPane: {
    marginTop: 30
  }
};

export default ({
  careTipps,
  category,
  onSelect,
  careTipp,
  careTipp: {
    id,
    // default values here
    title = "Welcome to the Hair-care guide!",
    description = "Take a look at the categories and select one to see the details."
  },
  onDelete,
  onEdit,
  editMode,
  onSelectEdit,
  categories
}) => (
  <Grid container>
    <Grid item xs={12} sm={6}>
      <Paper style={styles.Paper}>
        {careTipps.map(([cat, tipps]) =>
          !category || category === cat ? (
            <Fragment key={cat}>
              <Typography
                variant="headline"
                style={{ textTransform: "capitalize" }}
              >
                {cat}
              </Typography>
              <List component="ul">
                {tipps.map(({ id, title }) => (
                  <ListItem button onClick={() => onSelect(id)} key={id}>
                    <ListItemText primary={title} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => onSelectEdit(id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Fragment>
          ) : null
        )}
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Paper style={styles.Paper}>
        {editMode ? (
          <Form
            categories={categories}
            onSubmit={onEdit}
            careTipp={careTipp}
          />
        ) : (
          <Fragment>
            <Typography variant="display1" style={styles.RightPane}>
              {title}
            </Typography>
            <Typography variant="body1" style={styles.RightPane}>
              {description}
            </Typography>
          </Fragment>
        )}
      </Paper>
    </Grid>
  </Grid>
);
