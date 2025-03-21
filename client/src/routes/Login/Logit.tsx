import { useState } from "react";
import { useLoginMutation } from "../../app/apiSlice";

export const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      localStorage.setItem('token', response.token);
      alert('Вход выполнен успешно!');
    } catch (err) {
      alert('Ошибка входа');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='email' name="email" placeholder='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' name="password" placeholder='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type='submit' name='Submit' />
    </form>
  );
};