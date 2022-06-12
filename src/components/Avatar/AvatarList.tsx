import { User } from 'types/user.type';
import AvatarBubble from './AvatarBubble';
import './AvatarList.styles.scss';

type AvatarListProps = {
  users: User[];
  limit: number;
  size?: 'small' | 'regular';
  className?: string;
};

const AvatarList: React.FC<AvatarListProps> = ({ users, limit, size = 'regular', className }) => {
  return (
    <ul className={`avatar__list ${className ? className : ''}`}>
      {users.map((user: User, index: number) => {
        if (index < limit) {
          return <AvatarBubble key={index} size={size} user={user} />;
        }

        if (index === limit) {
          return <AvatarBubble key={index} size={size} remaining={users.length - limit} />;
        }

        return null;
      })}
    </ul>
  );
};

export default AvatarList;
