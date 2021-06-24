import { FormEvent, useState } from 'react';
import { useParams } from 'react-router';
import { toast, Toaster } from 'react-hot-toast';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      toast.error('You must be signed in');
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <div>
        <Toaster />
      </div>
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Room {title}</h1>
          {questions.length > 0 && (
            <span>
              {questions.length}{' '}
              {questions.length > 1 ? 'questions' : 'question'}
            </span>
          )}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="What would you like to ask?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          ></textarea>
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={`Avatar of ${user.name}`} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                To send a question, <button>sign in</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Send question
            </Button>
          </div>
        </form>

        <div className="questions-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
