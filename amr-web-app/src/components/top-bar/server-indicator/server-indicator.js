import { Tooltip } from '@material-ui/core'
import React from 'react'
import { statusChipTypes } from '../../status-chip/const'
import StatusChip from '../../status-chip/status-chip'

/**
 * A chip that tells whether the web application is connected to the server or not.
 *
 * Props:
 * - title - the text displayed in the chip.
 * - connected - whether the website is connected to the server.
 * - tooltipConnected - the tooltip text when connected to the server.
 * - tooltipDisconnected - the tooltip text when not connected to the server.
 */
const serverIndicator = ({
  title = 'SERVER',
  connected = false,
  tooltipConnected = 'You are connected to the server',
  tooltipDisconnected = 'You are not connected to the server',
}) => {
  return (
    <Tooltip
      title={connected ? tooltipConnected : tooltipDisconnected}
      placement="bottom"
    >
      <StatusChip
        status={title}
        type={connected ? statusChipTypes.OK : statusChipTypes.ERROR}
      />
    </Tooltip>
  )
}

export default React.memo(serverIndicator)
