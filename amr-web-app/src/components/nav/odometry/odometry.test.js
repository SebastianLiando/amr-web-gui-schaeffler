/* eslint-disable no-undef */
import { createShallow } from '@material-ui/core/test-utils'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'

import Odometry from './odometry'
import React from 'react'
import { Typography } from '@material-ui/core'

configure({ adapter: new Adapter() })

describe('<Odometry />', () => {
  let component = undefined

  const fakeData = {
    yaw: 180,
    vel_yaw: 4,
    x: 32.353234,
    vel_x: 3242,
    acc_x: 3,
    y: 54.33495,
    vel_y: 5434,
    acc_y: 5,
  }

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<Odometry />)
  })

  const getAllDataFields = (rootComponent) =>
    rootComponent.findWhere(
      (e) => e.type() === Typography && e.prop('variant') === 'caption'
    )

  const toStringArray = (dataFields) => {
    const result = Array(8)

    for (let i = 0; i < 8; i++) {
      result[i] = dataFields.at(i).text()
    }

    return result
  }

  it('should render without data or missing data', () => {
    let dataFields = getAllDataFields(component)

    let dataStrings = toStringArray(dataFields)

    expect(dataStrings).toEqual(['', '', '', '', '', '', '', ''])
  })

  it('should display data accordingly in 2 decimal places', () => {
    component.setProps({ data: fakeData })

    let dataFields = getAllDataFields(component)

    let dataStrings = toStringArray(dataFields)

    let expected = []

    for (let key in fakeData) {
      expected = expected.concat(fakeData[key].toFixed(2).toString())
    }

    expect(dataStrings).toEqual(expected)
  })
})
