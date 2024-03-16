import {format, parseISO} from 'date-fns'

const dateTimeFormatStr = "dd/MM/yyyy"

const formatDateTime = (dateStr: string) => {
  return format(parseISO(dateStr), dateTimeFormatStr)
}

export {
  formatDateTime
}
