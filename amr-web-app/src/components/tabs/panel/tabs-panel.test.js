/* eslint-disable no-undef */
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import { createShallow } from '@material-ui/core/test-utils'

import React from 'react'
import TabPanel from './tabs-panel'
import { Box } from '@material-ui/core'

configure({ adapter: new Adapter() })

describe('<TabPanel />', () => {
  let component = null

  const expectedBody = 'Test Body'

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<TabPanel>{expectedBody}</TabPanel>)
  })

  it('should not mount body if not active', () => {
    component.setProps({ currentValue: 0, activeValue: 1 })

    expect(component.children()).toHaveLength(0)
  })

  it('should mount body if active', () => {
    component.setProps({ currentValue: 0, activeValue: 0 })

    expect(component.find(Box).text()).toEqual(expectedBody)
  })
})
