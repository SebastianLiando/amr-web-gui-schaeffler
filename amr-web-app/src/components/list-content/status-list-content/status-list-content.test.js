/* eslint-disable no-undef */
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'

import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'

import StatusListContent from './status-list-content'
import StatusChip from '../../status-chip/status-chip'
import { ListItem, ListItemText } from '@material-ui/core'

configure({ adapter: new Adapter() })

describe('<StatusListContent />', () => {
  let component = null

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<StatusListContent />)
  })

  it('should not render item if not provided with payload', () => {
    component.setProps({
      data: undefined,
    })

    expect(component.find(ListItem)).toHaveLength(0)
  })

  it('should render the correct number of items', () => {
    component.setProps({
      data: [
        {
          id: 'a',
          name: 'Sensor A',
          status: 'ok',
          details: 'Details',
        },
        {
          id: 'b',
          name: 'Sensor B',
          status: 'ok',
          details: 'Details',
        },
      ],
    })

    expect(component.find(ListItem)).toHaveLength(2)
  })

  it('should render the correct data', () => {
    const id = 'a'
    const name = 'Sensor A'
    const status = 'ok'
    const details = 'Details'

    component.setProps({
      data: [
        {
          id,
          name,
          status,
          details,
        },
      ],
    })

    const listItem = component.find(ListItem)
    const statusChip = listItem.find(StatusChip)
    const listItemText = listItem.find(ListItemText)

    expect(statusChip.prop('type')).toEqual(status)
    expect(listItemText.prop('primary')).toEqual(name)
    expect(listItemText.prop('secondary')).toEqual(details)
  })
})
