import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../App';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useContext(AuthContext);

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Illustration representing questions and answers"
        />
        <strong>Create rooms of live Q&amp;A</strong>
        <p>Answer questions of your followers in real time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask logo" />
          <h1>{user?.name}</h1>
          <h2>Create a new room</h2>
          <form>
            <input type="text" placeholder="Room's name" />
            <Button type="submit">Create room</Button>
          </form>
          <p>
            Do you want to join an existing room? <Link to="/">Click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
