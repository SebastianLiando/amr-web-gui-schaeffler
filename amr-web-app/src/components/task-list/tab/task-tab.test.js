/* eslint-disable no-undef */
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'

import React from 'react'
import TaskTab from './tasks-tab'
import TaskList from '../list/tasks-list'
import TaskDiagram from '../diagram/task-diagram'
import { taskTabs } from './const'
import { Tabs, Tab } from '@material-ui/core'

configure({ adapter: new Adapter() })

describe('<TaskTab />', () => {
  let component = null

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<TaskTab />)
  })

  it('should have 2 tabs', () => {
    expect(component.find(Tab)).toHaveLength(2)
  })

  it('first tab should be a task list', () => {
    component.setProps({ value: taskTabs.LIST })

    const taskList = component.find(TaskList)

    expect(taskList.parent().prop('activeValue')).toEqual(taskTabs.LIST)
  })

  it('second tab should be a task diagram', () => {
    component.setProps({ value: taskTabs.DIAGRAM })

    const taskDiagram = component.find(TaskDiagram)

    expect(taskDiagram.parent().prop('activeValue')).toEqual(taskTabs.DIAGRAM)
  })

  it('should handle tab change event', () => {
    const mockFunction = jest.fn()

    component.setProps({ onTabChange: mockFunction })
    component.find(Tabs).at(0).simulate('change')

    expect(mockFunction).toHaveBeenCalled()
  })
})
