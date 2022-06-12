import React from 'react';

type SelectProps = {
  size?: 'large' | 'medium' | 'regular' | 'small';
  name: string;
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
  className?: string;
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return (
    <div className={`input input--${props.size} ${props.className ? props.className : ''}`}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <select ref={ref} name={props.name} id={props.name} value={props.value} onChange={props.onChange}>
        {props.children}
      </select>
    </div>
  );
});

export default Select;
