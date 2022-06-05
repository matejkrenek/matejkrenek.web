import { UserAvatar } from 'types/user.type';
import './AvatarBubble.styles.scss';

type AvatarBubbleProps = {
  avatar: UserAvatar;
  size?: 'small' | 'regular';
};

const AvatarBubble: React.FC<AvatarBubbleProps> = ({ avatar, size = 'regular' }) => {
  return (
    <div className={`avatar avatar--${size}`}>
      {avatar.image ? <img className="avatar--image" src={avatar.image} alt={avatar.inicials} /> : <span className="avatar--inicials">{avatar.inicials}</span>}
    </div>
  );
};

export default AvatarBubble;
