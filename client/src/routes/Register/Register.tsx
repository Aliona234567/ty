import React, { useState } from 'react';
import { useRegisterMutation } from '../../app/apiSlice';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setPRassword] = useState('');
  const [email, setEmail] = useState('');
  const [register] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === rPassword){
    try {
      await register({ username, password ,email}).unwrap();
      alert('Регистрация успешна!');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };}

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name="username" placeholder='username' required value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setUsername(e.target.value)}/>
      <input type='email' name="email" placeholder='email' required value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setEmail(e.target.value)}/>
      <input type='password' name="password" placeholder='password' required value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setPassword(e.target.value)}/>
      <input type='password' name="retrPassword" placeholder='retrPassword' required value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setPRassword(e.target.value)}/>
      <input type='submit' name='Submit'/>
    </form>
  );
};

export default Register;
