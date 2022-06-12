import AvatarBubble from 'components/Avatar/AvatarBubble';
import Button from 'components/Button/Button';
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthService } from 'services/auth/auth.service';
import './Navbar.styles.scss';

const Navbar: React.FC = () => {
  const auth = AuthService.useContext();
  const location = useLocation();
  const navigate = useNavigate();

  async function handleLogout() {
    await auth.logout();
  }

  return (
    <header className="navbar">
      <div>
        {location.pathname !== '/' && (
          <Button icon={<FiArrowLeft />} onClick={() => navigate(-1)}>
            Zpět
          </Button>
        )}
      </div>
      <div className="d-flex align-center">
        <Button icon={<FiLogOut />} className="mr-48" onClick={handleLogout} />
        <div className="mr-12">
          <h5 className="text--right">{auth.user().username}</h5>
          <p className="text--right text--muted">{auth.user().email}</p>
        </div>
        <AvatarBubble user={auth.user()} />
      </div>
    </header>
  );
};

export default Navbar;
