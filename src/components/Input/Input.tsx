import React from 'react';
import './Input.styles.scss';

type InputProps = {
  type: 'text' | 'password' | 'email';
  size?: 'large' | 'medium' | 'regular' | 'small';
  name: string;
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={`input input--${props.size} ${props.className ? props.className : ''}`}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input ref={ref} type={props.type} name={props.name} id={props.name} value={props.value} onChange={props.onChange} />
    </div>
  );
});

export default Input;
