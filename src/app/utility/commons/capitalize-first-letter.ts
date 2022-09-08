import {capitalizeName} from './capitalized-name'

export const capitalizeFirstLetter = (firstItem: string, secondItem: string) => {
  return (capitalizeName(firstItem).charAt(0) + capitalizeName(secondItem).charAt(0)).toUpperCase()
}

export const capitalizeOneFirstLetter = (fullItem: string) => {
  return capitalizeName(fullItem).charAt(0).toUpperCase()
}
