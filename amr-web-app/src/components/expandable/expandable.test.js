/* eslint-disable no-undef */
import { Collapse, Typography } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'

import React from 'react'
import Expandable from './expandable'

configure({ adapter: new Adapter() })

describe('<Expandable />', () => {
  let component = null

  const bodyString = 'Body String'

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(
      <Expandable>
        <p>{bodyString}</p>
      </Expandable>
    )
  })

  it('should display title from props', () => {
    const title = 'Test Title'
    component.setProps({ title })

    const titleComponent = component.find(Typography).at(0)

    expect(titleComponent.text()).toEqual(title)
  })

  it('should hide body when not expanded', () => {
    component.setProps({ expanded: false })

    const bodyComponent = component.find(Collapse)
    expect(bodyComponent.prop('in')).toEqual(false)
  })

  it('should show body when expanded', () => {
    component.setProps({ expanded: true })

    const bodyComponent = component.find(Collapse).find('p').at(0)
    expect(bodyComponent.text()).toEqual(bodyString)
  })
})
