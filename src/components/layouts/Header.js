import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import Dialog from '../categories/Dialog'

export default ({categories, onCareTippCreate}) =>
<AppBar position="static" color="secondary">
<Toolbar>
  <Typography variant="title" color="inherit" style={{flex: 1}}>
    Hair Care Database
  </Typography>
  <Dialog
  categories={categories}
  onCreate={onCareTippCreate}
  />
</Toolbar>
</AppBar>