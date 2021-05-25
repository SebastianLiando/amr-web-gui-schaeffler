/* eslint-disable no-undef */
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import { createShallow } from '@material-ui/core/test-utils'

import React from 'react'
import TaskText from './task-list-text'
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core'
import StatusChip from '../../status-chip/status-chip'
import { taskStatus } from './const'

configure({ adapter: new Adapter() })

describe('<TaskText />', () => {
  let component = null

  const expectedTaskName = 'Test Task Name'
  const expectedTaskDetail = 'Test task details. Test task details.'

  beforeEach(() => {
    const shallow = createShallow()
    component = shallow(
      <TaskText
        taskName={expectedTaskName}
        taskDetail={expectedTaskDetail}
        isComplete
      />
    )
  })

  it('should display task name', () => {
    const actualTitle = component.find(AccordionSummary).find(Typography).text()

    expect(actualTitle).toEqual(expectedTaskName)
  })

  it('should display in progress when the task is not completed', () => {
    component.setProps({ isComplete: false })

    const chipStatus = component
      .find(AccordionSummary)
      .find(StatusChip)
      .prop('status')

    expect(chipStatus).toEqual(taskStatus.IN_PROGRESS)
  })

  it('should display complete if the task is completed', () => {
    const chipStatus = component
      .find(AccordionSummary)
      .find(StatusChip)
      .prop('status')

    expect(chipStatus).toEqual(taskStatus.COMPLETE)
  })

  it('should display task details in the body', () => {
    const actualDetailText = component
      .find(AccordionDetails)
      .find(Typography)
      .text()

    expect(actualDetailText).toEqual(expectedTaskDetail)
  })
})
