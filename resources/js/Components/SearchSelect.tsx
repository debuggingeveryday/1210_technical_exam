import React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';
import { IoIosClose } from 'react-icons/io';

export default forwardRef(function SearchSelect(
  {
    type = 'text',
    className = '',
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, []);

  return (
    <div className="relative">
      <input
        {...props}
        type={type}
        className={
          'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
          className
        }
        ref={localRef}
      ></input>
      <IoIosClose />
    </div>
  );
});
