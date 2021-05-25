/* eslint-disable no-undef */
import React from 'react'
import CompanyLogo from './company-logo'
import { createShallow } from '@material-ui/core/test-utils'

import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import logo from '../../../assets/images/schaeffler-logo.png'
import { Tooltip } from '@material-ui/core'

configure({ adapter: new Adapter() })

describe('<CompanyLogo />', () => {
  let component = null

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<CompanyLogo />)
  })

  it('should display company logo', () => {
    expect(component.find('img').prop('src')).toEqual(logo)
  })

  it('should display the given tooltip', () => {
    const expected = 'Test tooltip'

    component.setProps({ tooltip: expected })

    expect(component.find(Tooltip).prop('title')).toEqual(expected)
  })
})
