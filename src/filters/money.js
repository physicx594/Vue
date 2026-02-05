export default function (num) {
  if (num === undefined || num === null) return 'NT $0'
  var parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return 'NT $' + parts.join('.')
}
