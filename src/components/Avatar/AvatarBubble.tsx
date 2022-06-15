import { User } from 'types/user.type';
import './AvatarBubble.styles.scss';

type AvatarBubbleProps = {
  user?: User;
  remaining?: number;
  size?: 'small' | 'regular';
};

const AvatarBubble: React.FC<AvatarBubbleProps> = ({ user, remaining, size = 'regular' }) => {
  return (
    <div className={`avatar avatar--${size}`}>
      {user ? (
        user.avatar ? (
          <img className="avatar--image" src={user.avatar} alt={user.username.slice(0, 2).toUpperCase()} />
        ) : (
          <span className="avatar--inicials">{user.username.slice(0, 2).toUpperCase()}</span>
        )
      ) : (
        <span className="avatar--inicials">{remaining}</span>
      )}
    </div>
  );
};

export default AvatarBubble;
