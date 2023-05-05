import React from 'react'
import { parseISO, formatDistance, formatDuration, formatDistanceToNow,intervalToDuration } from 'date-fns'

export const TimeAgoInProgress = ({ timestamp }) => {

  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const now = new Date()

    console.log('now', formatDuration(intervalToDuration({start:now, end: date}),{format: ['hours', 'minutes']} ))

    const timePeriod =     intervalToDuration({start:now, end: date})

    if (timePeriod.days>0) {
        timeAgo = `${timePeriod.days} days, ${timePeriod.hours} hours, ${timePeriod.minutes} minutes`;
    } else {
        timeAgo = `${timePeriod.hours} hours, ${timePeriod.minutes} minutes`;
    }

    console.log('timeperiod',timePeriod)

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
}