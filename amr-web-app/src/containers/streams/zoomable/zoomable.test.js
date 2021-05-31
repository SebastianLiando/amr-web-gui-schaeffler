/* eslint-disable no-undef */
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'

import React from 'react'
import Zoomable from './zoomable'
import { CloudOffRounded } from '@material-ui/icons'
import { Fade } from '@material-ui/core'

configure({ adapter: new Adapter() })

const ExpectedIcon = CloudOffRounded

describe('<Zoomable />', () => {
  let component

  beforeEach(() => {
    component = createShallow()(<Zoomable icon={<ExpectedIcon />} />)
  })

  it('should use the provided icon', () => {
    expect(component.find(ExpectedIcon)).toHaveLength(1)
  })

  it('should show icon on mouse enter', () => {
    component.simulate('mouseenter')

    expect(component.find(Fade).at(0).prop('in')).toEqual(true)
  })

  it('should hide icon on mouse leave', () => {
    component.simulate('mouseleave')

    expect(component.find(Fade).at(0).prop('in')).toEqual(false)
  })
})
