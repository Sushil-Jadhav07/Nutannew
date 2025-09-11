# Price Range Filtering Implementation

This document describes the implementation of price range filtering functionality for the e-commerce application.

## Overview

The price range filtering system allows users to filter products by price range using both a slider and input fields. The implementation includes:

- Dynamic price range calculation based on available products
- Real-time filtering with immediate UI updates
- Integration with existing category, color, and size filters
- Responsive design with Tailwind CSS
- Context-based state management for efficient data sharing

## Components

### 1. Price Filter Utility (`src/utils/price-filter.ts`)

Core utility functions for price filtering:

- `filterProductsByPrice()` - Filters products by price range
- `getPriceRangeFromProducts()` - Calculates min/max prices from product data
- `isDefaultPriceRange()` - Checks if current range is the default
- `normalizePriceRange()` - Validates and normalizes price ranges

### 2. Filter Hooks (`src/hooks/use-filter-hooks.ts`)

Enhanced hooks for comprehensive filtering:

- `useProductFiltering()` - Main hook for product filtering with price range support
- `useFilters()` - Original hook for sidebar filters
- `useFilterControls()` - Hook for horizontal filter controls

### 3. Filter Context (`src/contexts/FilterContext.tsx`)

React context for sharing filter state across components:

- `FilterProvider` - Context provider component
- `useFilterContext()` - Hook to access filter context

### 4. Price Range Filter Component (`src/components/filter/facets/price-range-filter.tsx`)

UI component for price range selection:

- Dual input fields for min/max prices
- Interactive slider with rc-slider
- Real-time validation and normalization
- Tailwind CSS styling

### 5. Enhanced Product Listing (`src/components/product/productListing/product-main-filtered.tsx`)

Product listing component with integrated filtering:

- Displays filtered products based on all active filters
- Shows filter status and clear options
- Pagination support for filtered results
- Empty state handling

## Features

### Price Range Selection

- **Slider Control**: Interactive range slider for visual price selection
- **Input Fields**: Direct input for precise price values
- **Validation**: Automatic validation and normalization of price values
- **Real-time Updates**: Immediate filtering as user adjusts range

### Dynamic Price Range

- **Auto-calculation**: Price range automatically adjusts based on available products
- **Default Range**: Intelligent default range based on product data
- **Boundary Validation**: Ensures min/max values stay within valid ranges

### Filter Integration

- **Combined Filtering**: Price range works with category, color, and size filters
- **Filter Status**: Clear indication of active filters and result counts
- **Clear Options**: Individual filter clearing and clear all functionality

### User Experience

- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Proper loading indicators during data fetching
- **Empty States**: Helpful messages when no products match filters
- **Accessibility**: Proper labels and keyboard navigation support

## Usage

### Basic Implementation

```tsx
import { FilterProvider } from '@/contexts/FilterContext';
import { ProductMainFiltered } from '@/components/product/productListing/product-main-filtered';
import Filters from '@/components/filter/filters';

function CategoryPage({ products }) {
  return (
    <FilterProvider products={products}>
      <div className="flex">
        <div className="w-1/4">
          <Filters />
        </div>
        <div className="w-3/4">
          <ProductMainFiltered 
            data={products} 
            isLoading={false} 
            viewAs={true} 
          />
        </div>
      </div>
    </FilterProvider>
  );
}
```

### Using Filter Context

```tsx
import { useFilterContext } from '@/contexts/FilterContext';

function MyComponent() {
  const {
    filteredProducts,
    selectedFilters,
    handlePriceChange,
    clearAllFilters,
    hasAnyFilters
  } = useFilterContext();

  return (
    <div>
      <p>Showing {filteredProducts.length} products</p>
      <button onClick={clearAllFilters}>
        Clear All Filters
      </button>
    </div>
  );
}
```

## Configuration

### Price Range Settings

The price range can be configured in the filter hooks:

```typescript
const MIN_PRICE = 0;        // Minimum allowed price
const MAX_PRICE = 1000;     // Maximum allowed price
const DEFAULT_RANGE = [0, 1000]; // Default price range
```

### Styling

The components use Tailwind CSS classes and can be customized:

- Price input fields: `border-gray-300 focus:border-blue-500`
- Slider track: `bg-blue-500`
- Filter sections: `bg-white p-5 rounded`

## Testing

A test component is available at `src/components/filter/price-filter-test.tsx` for testing the price filtering functionality with sample data.

## Browser Support

- Modern browsers with ES6+ support
- React 18+
- Tailwind CSS 3+

## Dependencies

- `rc-slider` - For the price range slider
- `react` - Core React functionality
- `@tanstack/react-query` - For data fetching (if using Firebase)

## Future Enhancements

- Price range presets (e.g., "Under $25", "$25-$50", "Over $100")
- Currency formatting based on locale
- Price range indicators on product cards
- Advanced filtering with multiple price ranges
- Price history tracking and trends
