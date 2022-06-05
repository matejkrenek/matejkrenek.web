import AuthCard from 'components/Auth/AuthCard';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <AuthCard>
      <h2 className="mb-28">Přihlášení</h2>
      <form>
        <Input type="text" name="username" label="Přihlašovací jméno" className="mb-12" />
        <Input type="password" name="password" label="Heslo" className="mb-12" />
        <Button type="primary" className="w-100">
          Přihlásit se
        </Button>
      </form>
      <Link to="/register" className="mt-24">
        Ještě nemám účet
      </Link>
    </AuthCard>
  );
};

export default Login;
