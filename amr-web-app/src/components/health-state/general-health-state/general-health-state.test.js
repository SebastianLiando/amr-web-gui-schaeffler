/* eslint-disable no-undef */
import { createShallow } from '@material-ui/core/test-utils'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'

import React from 'react'
import GeneralHealthState from './general-health-state'
import SimpleListContent from '../../list-content/simple-list-content/simple-list-content'

configure({ adapter: new Adapter() })

describe('<GeneralHealthState />', () => {
  let component = null

  // Utility function to find the list tile with the given title.
  const getTileData = (title, component) =>
    component
      .find(SimpleListContent)
      .prop('data')
      .find((e) => e.title === title)

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
    const target = getTileData('Battery', component)

    expect(target.value).toEqual('95.29%')
  })

  it('should display 2 digit temperature in celsius', () => {
    const target = getTileData('Temperature', component)

    expect(target.value).toEqual('37.50℃')
  })

  it('should display 2 digit distance', () => {
    const target = getTileData('Distance Travelled', component)

    expect(target.value).toEqual('54.12 m')
  })
})
