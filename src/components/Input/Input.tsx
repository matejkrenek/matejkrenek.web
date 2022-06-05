import './Input.styles.scss';

type InputProps = {
  type: 'text' | 'password' | 'email';
  name: string;
  label: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({ type, name, label, className }) => {
  return (
    <div className={`input ${className ? className : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} />
    </div>
  );
};

export default Input;
