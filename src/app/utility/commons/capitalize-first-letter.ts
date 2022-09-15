import {capitalizeName} from './capitalized-name'

export const capitalizeFirstLetter = (firstItem: string, secondItem: string) => {
  return (capitalizeName(firstItem).charAt(0) + capitalizeName(secondItem).charAt(0)).toUpperCase()
}

/** Fix date */
export const capitalizeOneFirstLetter = (fullItem: string) => {
  return capitalizeName(fullItem).charAt(0).toUpperCase()
}
