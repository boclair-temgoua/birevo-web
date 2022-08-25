export const capitalizeName = (s: string) => {
  if (typeof s !== 'string') return ''
  const v = s.toLowerCase()
  return v.charAt(0).toUpperCase() + v.slice(1)
}
