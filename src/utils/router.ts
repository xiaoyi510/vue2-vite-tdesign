const title = '追溯'

export function getPageTitle(pageTitle: string): string {
  if (pageTitle !== '')
    return `${pageTitle} - ${title}`

  return `${title}`
}
