import AuthCard from 'components/Auth/AuthCard';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from 'services/auth/auth.service';

const Login: React.FC = () => {
  const auth = AuthService.useContext();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await auth.login(form);
  }

  return (
    <AuthCard>
      <h2 className="mb-28">Přihlášení</h2>
      <form onSubmit={handleLogin}>
        <Input type="text" name="username" label="Přihlašovací jméno" className="mb-12" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Input type="password" name="password" label="Heslo" className="mb-12" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="primary" className="w-100">
          {auth.isLoading() ? '...loading' : 'Přihlásít se'}
        </Button>
      </form>
      <Link to="/register" className="mt-24">
        Ještě nemám účet
      </Link>
    </AuthCard>
  );
};

export default Login;
