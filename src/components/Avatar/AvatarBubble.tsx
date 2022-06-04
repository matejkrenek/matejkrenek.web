import { UserAvatar } from 'types/user.type';
import './AvatarBubble.styles.scss';

type AvatarBubbleProps = {
  avatar: UserAvatar;
};

const AvatarBubble: React.FC<AvatarBubbleProps> = ({ avatar }) => {
  return <div className="avatar">{avatar.image ? <img className="avatar--image" src={avatar.image} alt={avatar.inicials} /> : <span className="avatar--inicials">{avatar.inicials}</span>}</div>;
};

export default AvatarBubble;
