import moment from 'moment'

export const formatDate = dateString => {
  return dateString ? moment(new Date(dateString)).format('MMM D, YYYY') : ''
}

export const removeLineBreak = str => {
  return str.replace(/\r?\n|\r/g, ' ')
}

export const isLocal = () => {
  return process.env.NODE_ENV == 'local'
}
