/* eslint-disable no-undef */
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'

import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import SimpleListContent from './simple-list-content'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

configure({ adapter: new Adapter() })

describe('<SimpleListContent />', () => {
  let component = null

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<SimpleListContent />)
  })

  it('should not render item if not provided with payload', () => {
    component.setProps({
      data: undefined,
    })

    expect(component.find(ListItem)).toHaveLength(0)
  })

  it('should render the correct number of items', () => {
    component.setProps({
      data: ['a', 'b'],
    })

    expect(component.find(ListItem)).toHaveLength(2)
  })

  it('should render the correct data', () => {
    const icon = faCoffee
    const title = 'Coffee'
    const value = '123.5'

    component.setProps({
      data: [
        {
          icon,
          title,
          value,
        },
      ],
    })

    const listItem = component.find(ListItem)
    const fontAwIcon = listItem.find(FontAwesomeIcon)
    const listItemText = listItem.find(ListItemText)
    const valueText = listItem
      .find(ListItemSecondaryAction)
      .find(Typography)
      .text()

    expect(fontAwIcon.prop('icon')).toEqual(icon)
    expect(listItemText.prop('primary')).toEqual(title)
    expect(valueText).toEqual(value)
  })
})
