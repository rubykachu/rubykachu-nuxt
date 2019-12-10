import moment from 'moment'

export const formatDate = date => {
  return date ? moment(date).format('MMM D, YYYY') : ''
}

export const removeLineBreak = str => {
  return str.replace(/\r?\n|\r/g, ' ')
}
