import React from 'react'
import {Paper, Tabs, Tab} from '@material-ui/core';

export default ({categories, activeCategory, onSelect}) => {
  
  const index = activeCategory
  ? categories.findIndex(cat => cat === activeCategory) +1
  :  0

  const onIndexSelect = (e, index) =>
    onSelect(index === 0 ? '' : categories[index - 1])

  return <Paper>
  <Tabs
    value={index}
    onChange={onIndexSelect}
    indicatorColor="secondary"
    textColor="secondary"
    centered
  >
  <Tab label="All" />
  {categories.map(cat=>
  <Tab label={cat} key={cat.id}/>
  )}
  </Tabs>
</Paper>
}
