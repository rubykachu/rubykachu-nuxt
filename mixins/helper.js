import moment from 'moment'

export const formatDate = dateString => {
  return dateString ? moment(new Date(dateString)).format('MMM D, YYYY') : ''
}

export const removeLineBreak = str => {
  return str.replace(/\r?\n|\r/g, ' ')
}

export const sanitizeTitle = title => {
  var slug = ''
  // Change to lower case
  var titleLower = title.toLowerCase()
  // Letter "e"
  slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
  // Letter "a"
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
  // Letter "o"
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
  // Letter "u"
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
  // Letter "y"
  slug = slug.replace(/y|ý|ỳ|ỵ|ỷ/gi, 'y')
  // Letter "i"
  slug = slug.replace(/i|í|ì|ị|ỉ/gi, 'i')
  // Letter "d"
  slug = slug.replace(/đ/gi, 'd')
  // Trim the last whitespace
  slug = slug.replace(/\s*$/g, '')
  // Change whitespace to "-"
  slug = slug.replace(/\s+/g, '-')
  // Trim the : _
  slug = slug.replace(/[:_]/g, '')

  return slug
}

export const fullPath = string => {
  return location.protocol + '//' + location.hostname + string
}
