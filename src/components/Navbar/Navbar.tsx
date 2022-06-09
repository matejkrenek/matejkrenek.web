import AvatarBubble from 'components/Avatar/AvatarBubble';
import Button from 'components/Button/Button';
import { FiLogOut } from 'react-icons/fi';
import { AuthService } from 'services/auth/auth.service';
import './Navbar.styles.scss';

const Navbar: React.FC = () => {
  const auth = AuthService.useContext();

  async function handleLogout() {
    await auth.logout();
  }

  return (
    <header className="navbar">
      <div></div>
      <div className="d-flex align-center">
        <Button icon={<FiLogOut />} className="mr-48" onClick={handleLogout} />
        <div className="mr-12">
          <h5 className="text--right">{auth.user().username}</h5>
          <p className="text--right text--muted">{auth.user().email}</p>
        </div>
        <AvatarBubble avatar={{ inicials: auth.user().username.slice(0, 2).toUpperCase() }} />
      </div>
    </header>
  );
};

export default Navbar;
