import { Box } from '@material-ui/core'
import React from 'react'

/**
 * Used as the body of the tab. The children of this component will be rendered if the `activeValue`
 * is equal to the `currentValue`.
 *
 * @param {*} currentValue The current tab identifier.
 * @param {*} activeValue tab identifier in which the content should be rendered.
 * @param {Component} children content of the tab to render if the tab is active.
 */
const tabPanel = ({ currentValue, activeValue, children }) => {
  if (currentValue === activeValue && currentValue !== undefined) {
    return <Box>{children}</Box>
  } else {
    return null
  }
}

export default tabPanel
