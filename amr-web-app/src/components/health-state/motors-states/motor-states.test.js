/* eslint-disable no-undef */
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'

import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'

import StatusListContent from '../../list-content/status-list-content/status-list-content'
import MotorStates from './motor-states'

configure({ adapter: new Adapter() })

describe('<MotorStates />', () => {
  let component = null

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<MotorStates />)
  })

  it('should pass data to the content', () => {
    const data = ['a', 'b']

    component.setProps({ data })

    expect(component.find(StatusListContent).prop('data')).toEqual(data)
  })
})
