// components/ui/Checkbox.js
import React from 'react';

const Checkbox = ({ checked, onChange, label }:{checked:any,onChange:any,label:string}) => {
  return (
    <>
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id="custom-checkbox"
      />
      <label htmlFor="custom-checkbox">{label}</label>
    </div>
    </>
   
  );
};

export default Checkbox;