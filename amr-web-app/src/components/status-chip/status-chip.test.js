/* eslint-disable no-undef */
import StatusChip from './status-chip'

import { configure } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import React from 'react'
import { Chip } from '@material-ui/core'

configure({ adapter: new Adapter() })

describe('<StatusChip />', () => {
  let component = null

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<StatusChip />)
  })

  it('should display title from props', () => {
    const title = 'test title'
    component.setProps({ status: title })

    const renderedTitle = component.find(Chip).at(0).prop('label')

    expect(renderedTitle).toEqual(title)
  })
})
