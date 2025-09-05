// Centralized currency configuration
export const CURRENCY_CONFIG = {
  code: 'AED',
  locale: 'en-AE', // English with UAE formatting
  symbol: 'د.إ', // AED symbol
  name: 'UAE Dirham'
} as const;

// Default currency code for the application
export const DEFAULT_CURRENCY = CURRENCY_CONFIG.code;

// Default locale for currency formatting
export const DEFAULT_LOCALE = CURRENCY_CONFIG.locale;
