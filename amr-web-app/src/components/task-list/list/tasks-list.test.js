/* eslint-disable no-undef */
import { configure } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import React from 'react'
import TasksList from './tasks-list'
import TaskListText from '../text/task-list-text'

configure({ adapter: new Adapter() })

describe('<TasksList />', () => {
  let component = null

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(<TasksList />)
  })

  it('should display nothing on empty array', () => {
    expect(component.find(TaskListText)).toHaveLength(0)
  })

  it('should display according to the number of tasks', () => {
    const expectedTasks = [
      { id: 1, name: 'A', description: 'Desc A', completed: false },
      { id: 2, name: 'A', description: 'Desc A', completed: false },
      { id: 3, name: 'A', description: 'Desc A', completed: false },
    ]

    component.setProps({
      tasks: expectedTasks,
    })

    expect(component.find(TaskListText)).toHaveLength(expectedTasks.length)
  })
})
