/* eslint-disable no-undef */
import SimpleListTile from './simple-list-tile'
import { configure } from 'enzyme'

import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { createShallow } from '@material-ui/core/test-utils'

import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import { Typography } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

configure({ adapter: new Adapter() })

describe('<SimpleListTile />', () => {
  let component = null

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<SimpleListTile />)
  })

  it('should display title from props', () => {
    const title = 'Test Title'
    component.setProps({ title })

    const titleComponent = component
      .findWhere(
        (node) =>
          node.type() == Typography && node.prop('variant') === 'subtitle1'
      )
      .at(0)

    expect(titleComponent.text()).toEqual(title)
  })

  it('should display value from props', () => {
    const value = 'Test Value %'
    component.setProps({ value })

    const valueComponent = component
      .findWhere(
        (node) => node.type() == Typography && node.prop('variant') === 'body2'
      )
      .at(0)

    expect(valueComponent.text()).toEqual(value)
  })

  it('should display icon from props', () => {
    component.setProps({ icon: faCoffee })

    const iconComponent = component.find(FontAwesomeIcon).at(0)

    expect(iconComponent.prop('icon')).toEqual(faCoffee)
  })
})
