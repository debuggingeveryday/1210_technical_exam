import React from 'react';

export default function AlertBar({ ...props }) {
  return (
    <>
      <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400">
        <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
      </div>
    </>
  );
}
