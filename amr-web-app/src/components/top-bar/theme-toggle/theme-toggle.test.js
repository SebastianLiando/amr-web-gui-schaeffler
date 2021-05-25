/* eslint-disable no-undef */
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { createShallow } from '@material-ui/core/test-utils'

import ThemeToggle from './theme-toggle'
import React from 'react'
import { BrightnessHigh, BrightnessLow } from '@material-ui/icons'
import { IconButton, Tooltip } from '@material-ui/core'

configure({ adapter: new Adapter() })

describe('<ThemeToggle />', () => {
  let component = null

  beforeEach(() => {
    component = createShallow()(<ThemeToggle />)
  })

  it('should display light icon on light theme', () => {
    component.setProps({ lightTheme: true })

    expect(component.find(BrightnessHigh)).toHaveLength(1)
  })

  it('should display dark icon on dark theme', () => {
    component.setProps({ lightTheme: false })

    expect(component.find(BrightnessLow)).toHaveLength(1)
  })

  it('should display light tooltip on light theme', () => {
    const tooltip = 'Test Tooltip'
    component.setProps({ lightTheme: true, tooltipLight: tooltip })

    expect(component.find(Tooltip).prop('title')).toEqual(tooltip)
  })

  it('should display dark tooltip on dark theme', () => {
    const tooltip = 'Test Tooltip'
    component.setProps({ lightTheme: false, tooltipDark: tooltip })

    expect(component.find(Tooltip).prop('title')).toEqual(tooltip)
  })

  it('should handle click event', () => {
    const mockFunction = jest.fn()
    component.setProps({ onToggle: mockFunction })

    component.find(IconButton).at(0).simulate('click')

    expect(mockFunction).toHaveBeenCalled()
  })
})
