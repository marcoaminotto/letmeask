import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { Modal } from '../../components/Modal';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import deleteRedImg from '../../assets/images/delete-red.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';
import closeImg from '../../assets/images/close.svg';

import './styles.scss';
import { useState } from 'react';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [whichModal, setWhichModal] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleCheckQuestionAsAsnwered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  return (
    <div id="page-room">
      {whichModal === 'close-room' ? (
        <Modal
          open={isOpenModal}
          close={() => setIsOpenModal(false)}
          content={{
            icon: `${closeImg}`,
            title: 'Close room',
            description: 'Are you sure that you want to close the room?',
            buttonConfirmText: 'Yes, close it',
          }}
          buttonFunction={handleEndRoom}
        />
      ) : whichModal === 'delete-question' ? (
        <Modal
          open={isOpenModal}
          close={() => setIsOpenModal(false)}
          content={{
            icon: `${deleteRedImg}`,
            title: 'Delete question',
            description: 'Are you sure that you want to delete this question?',
            buttonConfirmText: 'Yes, delete it',
          }}
          asyncBunttonFuntion={() => handleDeleteQuestion(selectedQuestion)}
        />
      ) : (
        <></>
      )}

      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />
          <div>
            <RoomCode code={roomId} />
            <Button
              isOutlined
              onClick={() => {
                setWhichModal('close-room');
                setIsOpenModal(true);
              }}
            >
              Close room
            </Button>
          </div>
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

        <div className="questions-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAsnwered(question.id)}
                    >
                      <img src={checkImg} alt="Check question" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Answer question" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedQuestion(question.id);
                    setWhichModal('delete-question');
                    setIsOpenModal(true);
                  }}
                >
                  <img src={deleteImg} alt="Remove question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
