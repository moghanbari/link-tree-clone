import React from 'react';

const TextField = ({placeholder, type, value, onChange, name}) => {
  return <input className="shadow appearance-none border rounded w-full p-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type={type ? type : 'text'} placeholder={placeholder} value={value} onChange={onChange} name={name} />;
};

export default TextField;
