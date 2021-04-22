/* eslint-disable no-undef */
import { createShallow } from '@material-ui/core/test-utils'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'

import React from 'react'
import GeneralHealthState from './general-health-state'
import SimpleListTile from '../../list-item/simple-list-tile/simple-list-tile'

configure({ adapter: new Adapter() })

describe('<GeneralHealthState />', () => {
  let component = null

  // Utility function to find the list tile with the given title.
  const getListTile = (title, component) =>
    component
      .findWhere(
        (node) => node.type() == SimpleListTile && node.prop('title') === title
      )
      .at(0)

  beforeEach(() => {
    const shallow = createShallow()

    const fakeData = {
      battery: 95.293847,
      temperature: 37.49873,
      distance: 54.12385,
    }

    component = shallow(<GeneralHealthState data={fakeData} />)
  })

  it('should display 2 digit battery', () => {
    const target = getListTile('Battery', component)

    expect(target.prop('value')).toEqual('95.29%')
  })

  it('should display 2 digit temperature in celsius', () => {
    const target = getListTile('Temperature', component)

    expect(target.prop('value')).toEqual('37.50℃')
  })

  it('should display 2 digit distance', () => {
    const target = getListTile('Distance Travelled', component)
    
    expect(target.prop('value')).toEqual('54.12 m')
  })
})
