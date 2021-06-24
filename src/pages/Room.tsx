import { Button } from '../components/Button';

import { useParams } from 'react-router';

import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParams>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />
          <RoomCode code={params.id}/>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Room react</h1>
          <span>4 questions</span>
        </div>
        <form action="">
          <textarea placeholder="What would you like to ask?"></textarea>
          <div className="form-footer">
            <span>
              To send a question, <button>sign in</button>.
            </span>
            <Button type="submit">Send question</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
