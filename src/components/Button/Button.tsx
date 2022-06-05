import './Button.styles.scss';

type ButtonProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'purple' | 'primary' | 'regular';
  size?: 'small' | 'medium' | 'normal';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({ children, icon, type = 'primary', size = 'normal', className, onClick }) => {
  return (
    <button className={`btn btn--${type} btn--${size} ${icon ? 'btn--icon' : ''} ${className && className}`} onClick={onClick}>
      {icon && <i className="icon">{icon}</i>}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
