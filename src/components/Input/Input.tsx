import './Input.styles.scss';

type InputProps = {
  type: 'text' | 'password' | 'email';
  name: string;
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const Input: React.FC<InputProps> = ({ type, name, label, className, value, onChange }) => {
  return (
    <div className={`input ${className ? className : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
