import React from 'react';

export default function Select({ className = '', options = [], placeholder = '', ...props }: any) {
  return (
    <>
      <select
        {...props}
        className={`border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ${className}`}
      >
        {options.length > 0 && (
          <>
            {props.hasAllOption && (
              <option className="text-gray-100" value="" selected>
                All
              </option>
            )}
            {props.placeholderValue && (
              <option className="text-gray-100" value="" disabled selected>
                {props.placeholderValue}
              </option>
            )}
            {options.map((item: any) =>
              props.mutate ? (
                <>{props.mutate(item)}</>
              ) : (
                <>
                  <option label={item} value={item}>
                    {item}
                  </option>
                </>
              )
            )}
          </>
        )}
      </select>
    </>
  );
}
