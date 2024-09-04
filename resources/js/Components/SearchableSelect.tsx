import React from 'react';
import Select from 'react-select';

export default function SearchSelect({ ...props }) {
  return <Select options={props.options} {...props} />;
}
