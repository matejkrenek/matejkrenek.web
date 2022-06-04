import { UserAvatar } from 'types/user.type';
import AvatarBubble from './AvatarBubble';
import './AvatarList.styles.scss';

type AvatarListProps = {
  avatars: UserAvatar[];
  limit: number;
};

const AvatarList: React.FC<AvatarListProps> = ({ avatars, limit }) => {
  return (
    <ul className="avatar__list">
      {avatars.map((avatar: UserAvatar, index: number) => {
        if (index < limit) {
          return <AvatarBubble key={index} avatar={avatar} />;
        }

        if (index === limit) {
          return (
            <AvatarBubble
              key={index}
              avatar={{
                inicials: `+${avatars.length - limit}`,
              }}
            />
          );
        }
      })}
    </ul>
  );
};

export default AvatarList;
