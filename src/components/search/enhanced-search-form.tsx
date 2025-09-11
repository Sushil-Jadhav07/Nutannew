import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import SearchIcon from '@/components/icons/search-icon';
import CloseIcon from '@/components/icons/close-icon';
import { useAdvancedSearch } from '@/hooks/use-advanced-search';
import { Product } from '@/services/types';

type EnhancedSearchFormProps = {
  className?: string;
  searchId?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  onClear: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  variant?: 'border' | 'dark' | 'fill';
  products?: Product[];
  showSuggestions?: boolean;
  onSuggestionSelect?: (suggestion: string) => void;
};

const EnhancedSearchForm = React.forwardRef<HTMLInputElement, EnhancedSearchFormProps>(
  (
    {
      className,
      searchId = 'search',
      variant = 'border',
      value,
      onSubmit,
      onClear,
      onFocus,
      products = [],
      showSuggestions = true,
      onSuggestionSelect,
      ...rest
    },
    ref,
  ) => {
    const [showSuggestionsList, setShowSuggestionsList] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Use advanced search for suggestions
    const { suggestions, handleSearch } = useAdvancedSearch({
      products,
      searchIn: ['name', 'category', 'subcategory'],
      enableSuggestions: showSuggestions,
      maxSuggestions: 8
    });

    // Handle input change
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      handleSearch(inputValue);
      setShowSuggestionsList(inputValue.length > 1);
      setSelectedSuggestionIndex(-1);
      rest.onChange(e);
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion: string) => {
      if (onSuggestionSelect) {
        onSuggestionSelect(suggestion);
      }
      setShowSuggestionsList(false);
      setSelectedSuggestionIndex(-1);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showSuggestionsList || suggestions.length === 0) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedSuggestionIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedSuggestionIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
            handleSuggestionClick(suggestions[selectedSuggestionIndex]);
          } else {
            onSubmit(e);
          }
          break;
        case 'Escape':
          setShowSuggestionsList(false);
          setSelectedSuggestionIndex(-1);
          break;
      }
    };

    // Handle focus
    const handleFocus = (e: React.SyntheticEvent) => {
      if (value.length > 1) {
        setShowSuggestionsList(true);
      }
      if (onFocus) {
        onFocus(e);
      }
    };

    // Handle blur
    const handleBlur = (e: React.FocusEvent) => {
      // Delay hiding suggestions to allow clicking on them
      setTimeout(() => {
        setShowSuggestionsList(false);
        setSelectedSuggestionIndex(-1);
      }, 200);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
          setShowSuggestionsList(false);
          setSelectedSuggestionIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className="relative w-full" ref={suggestionsRef}>
        <form
          className={cn("flex w-full relative", className)}
          noValidate
          role="search"
          onSubmit={onSubmit}
        >
          <label htmlFor={searchId} className="flex flex-1 items-center py-0.5">
            <input
              id={searchId}
              ref={inputRef}
              className={cn(
                'text-heading outline-none w-full h-[42px] ltr:pl-5 md:ltr:pl-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 text-brand-dark dark:text-white text-sm rounded transition-all duration-200 focus:ring-0 placeholder:text-brand-dark/50 dark:placeholder:text-white/50',
                {
                  'border-2 bg-brand-light dark:bg-gray-800 border-black/10 dark:border-white/10 focus:border-black/50 focus:ring-0': variant === 'border',
                  'bg-brand-light border-2 border-black/10 dark:border-white/15 focus:border-black/50': variant === 'dark',
                  'bg-gray-100 border-0 focus:border-black/50': variant === 'fill',
                }
              )}
              placeholder="Search products, categories, brands..."
              aria-label={searchId}
              autoComplete="off"
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={ref}
              {...rest}
            />
          </label>
          {value ? (
            <button
              type="button"
              onClick={onClear}
              title="Clear search"
              className="absolute top-0 flex items-center justify-center h-full transition duration-200 ease-in-out outline-none ltr:right-0 rtl:left-0 w-14 md:w-16 hover:text-heading focus:outline-none dark:text-white"
            >
              <CloseIcon className="w-[17px] h-[17px] opacity-40" />
            </button>
          ) : (
            <span className="absolute top-0 flex items-center justify-center h-full w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 focus:outline-none dark:text-white">
              <SearchIcon className="w-5 h-5 opacity-40" />
            </span>
          )}
        </form>

        {/* Search Suggestions */}
        {showSuggestionsList && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
            <div className="py-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                    {
                      'bg-gray-100 dark:bg-gray-700': index === selectedSuggestionIndex
                    }
                  )}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center">
                    <SearchIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

EnhancedSearchForm.displayName = 'EnhancedSearchForm';

export default EnhancedSearchForm;
