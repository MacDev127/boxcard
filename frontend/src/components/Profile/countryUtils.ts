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
    // Add as many cases as you need
    default:
      return 'UN'; // 'UN' is a fallback if no match
  }
}
