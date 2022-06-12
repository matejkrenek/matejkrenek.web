import React from 'react';

type TextareaProps = {
  size?: 'large' | 'medium' | 'regular' | 'small';
  name: string;
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return (
    <div className={`input input--${props.size} ${props.className ? props.className : ''}`}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <textarea ref={ref} name={props.name} id={props.name} onChange={props.onChange} value={props.value}></textarea>
    </div>
  );
});

export default Textarea;
