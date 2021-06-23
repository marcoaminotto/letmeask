import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      author: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

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
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Room's name"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
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
