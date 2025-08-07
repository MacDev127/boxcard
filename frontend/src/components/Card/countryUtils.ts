// countryUtils.ts
export function getIsoCode(countryName: string): string {
  switch (countryName.toLowerCase()) {
    case 'ireland':
      return 'IE';
    case 'united states':
    case 'usa':
      return 'US';
    case 'united kingdom':
      return 'GB';
    default:
      return 'UN';
  }
}
