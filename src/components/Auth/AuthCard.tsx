import './AuthCard.styles.scss';

type AuthCardProps = {
  children: React.ReactNode;
};

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return <div className="authCard">{children}</div>;
};

export default AuthCard;
