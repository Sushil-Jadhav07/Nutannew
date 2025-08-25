export function getDirection(pathname: string): 'ltr' | 'rtl' {
  return pathname.includes('ar') ? 'rtl' : 'ltr'; // Mock logic
}
