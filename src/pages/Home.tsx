import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();

  function navigateToNewRoom() {
    history.push('/rooms/new');
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
          <button onClick={navigateToNewRoom} className="create-room">
            <img src={googleIconImg} alt="Google logo" />
            Create your room with Google
          </button>
          <div className="separator">Or join a room</div>
          <form>
            <input type="text" placeholder="Type the room's code" />
            <Button type="submit">Join the room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
