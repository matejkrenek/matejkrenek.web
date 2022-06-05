import AuthCard from 'components/Auth/AuthCard';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <AuthCard>
      <h2 className="mb-28">Registrace</h2>
      <form>
        <Input type="text" name="username" label="Přihlašovací jméno" className="mb-12" />
        <Input type="email" name="email" label="Email" className="mb-12" />
        <Input type="password" name="password" label="Heslo" className="mb-12" />
        <Input type="password" name="password_confirmation" label="Heslo znovu" className="mb-12" />
        <Button type="primary" className="w-100">
          Zaregistrovat se
        </Button>
      </form>
      <Link to="/login" className="mt-24">
        Už mám účet
      </Link>
    </AuthCard>
  );
};

export default Register;
