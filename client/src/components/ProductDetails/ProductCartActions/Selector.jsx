import React from 'react';

const Selector = ( { name, id, label, onChange, value, disabled, selectRef, showLabel, children } ) => {
  return (
    <div style={{ position: 'relative', display: 'flex', flexGrow: '1' }}>
      <label 
        htmlFor={id}
        className={showLabel ? '' : 'pd-visual-hidden'}
        style={showLabel ? {
          position: 'absolute',
          transform: 'translateY(-100%)',
          userSelect: 'none'
        } : {}}
      >
        {label}
      </label>
      <span
        className='pd-select-arrow'
      >
        &rsaquo;
      </span>
      <select
        name={name}
        id={id}
        value={value}
        disabled={disabled}
        ref={selectRef}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value)
          }
        }}
        className='pd-select'
      >
      
        {children}
      </select>
    </div>
    
  );
}

export default Selector;