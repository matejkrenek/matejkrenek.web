import AuthCard from 'components/Auth/AuthCard';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from 'services/auth/auth.service';

const Register: React.FC = () => {
  const auth = AuthService.useContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  async function handleRegistration(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await auth.register(form);
  }

  return (
    <AuthCard>
      <h2 className="mb-28">Registrace</h2>
      <form onSubmit={handleRegistration}>
        <Input type="text" name="username" label="Přihlašovací jméno" className="mb-12" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Input type="email" name="email" label="Email" className="mb-12" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input type="password" name="password" label="Heslo" className="mb-12" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Input
          type="password"
          name="password_confirmation"
          label="Heslo znovu"
          className="mb-12"
          value={form.password_confirmation}
          onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
        />
        <Button type="primary" className="w-100">
          {auth.isLoading() ? '...loading' : 'Zaregistrovat se'}
        </Button>
      </form>
      <Link to="/login" className="mt-24">
        Už mám účet
      </Link>
    </AuthCard>
  );
};

export default Register;
