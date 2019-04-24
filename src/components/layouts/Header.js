import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import CreateDialog from '../categories/dialogs/Create'

export default ({categories, onCareTippCreate}) =>
<AppBar position="static" color="secondary">
<Toolbar>
  <Typography variant="title" color="inherit" style={{flex: 1}}>
    Hair Care Database
  </Typography>
  <CreateDialog
  categories={categories}
  onCreate={onCareTippCreate}
  />
</Toolbar>
</AppBar>