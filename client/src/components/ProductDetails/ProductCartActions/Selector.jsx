import React from 'react';

const Selector = ( { name, id, label, onChange, value, children } ) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={(e) => {
          if(onChange){
            onChange(e.target.value)
          }
        }}
      >
        {children}
      </select>
    </>
    
  );
}

export default Selector;