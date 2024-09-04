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
            {options.map((item: any) =>
              props.mutate ? (
                <>{props.mutate(item)}</>
              ) : (
                <>
                  <option label={item}>{item}</option>
                </>
              )
            )}
          </>
        )}
      </select>
    </>
  );
}
