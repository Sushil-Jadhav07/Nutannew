import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    label?: string;
    placeholder?: string;
    name: string;
    error?: string;
    type?: string;
    shadow?: boolean;
    variant?: 'normal' | 'solid' | 'outline';
    id?: string;
}
const classes = {
    root: 'py-2 px-4 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body rounded placeholder-[#B3B3B3] min-h-11 transition duration-200 ease-in-out text-brand-dark focus:ring-0',
    normal:
        'bg-gray-100/50 border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-3 focus:ring-black/5 ',
    solid:
        'bg-white text-brand-dark border-border-two focus:ring-3 focus:outline-none focus:border-gray-400 focus:ring-3 focus:ring-black/5',
    outline: 'border-white/20 focus:border-brand-light/50',
    shadow: 'focus:shadow',
};
const Input = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            className = 'block',
            label,
            name,
            error,
            placeholder,
            variant = 'normal',
            shadow = false,
            type = 'text',
            inputClassName,
            labelClassName,
            id, // Destructure id prop
            ...rest
        },
        ref,
    ) => {
        // Use provided id or generate a unique id based on name
        const inputId = id || `${name}-${uuidv4()}`;
        
        const rootClassName = cn(
            classes.root,
            {
                [classes.normal]: variant === 'normal',
                [classes.solid]: variant === 'solid',
                [classes.outline]: variant === 'outline',
            },
            {
                [classes.shadow]: shadow,
            },
            inputClassName,
        );
        return (
            <div className={className}>
                {label && (
                    <label
                        htmlFor={inputId} // Use inputId
                        className={`block font-medium text-sm leading-none mb-3 cursor-pointer ${
                            labelClassName || 'text-brand-dark '
                        }`}
                    >
                        {label}
                    </label>
                )}
                <input
                    id={inputId} // Use inputId
                    name={name}
                    type={type}
                    ref={ref}
                    placeholder={placeholder}
                    className={rootClassName}
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid={error ? 'true' : 'false'}
                    {...rest}
                />
                {error && (
                    <p className="my-2 text-13px text-brand-danger ">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';
export default Input;
