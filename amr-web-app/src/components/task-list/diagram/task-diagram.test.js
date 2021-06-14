/* eslint-disable no-undef */
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import React from 'react'
import TaskDiagram from './task-diagram'

import { createShallow } from '@material-ui/core/test-utils'

import Lottie from 'react-lottie'

configure({ adapter: new Adapter() })

describe('<TaskDiagram />', () => {
  let component = null

  beforeEach(() => {
    component = createShallow()(<TaskDiagram />)
  })

  it('displays image when the image data is available', () => {
    component.setProps({ base64Png: 'image data' })

    expect(component.find('img')).toHaveLength(1)
  })

  it('displays lottie animation when image data is not available', () => {
    component.setProps({ base64Png: null })

    expect(component.find(Lottie)).toHaveLength(1)
  })
})
