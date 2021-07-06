import ReactModal from 'react-modal';

import { Button } from '../Button';

import './styles.scss';

type MoldaTypes = {
  open: boolean;
  close: () => void;
  content: {
    icon: string;
    title: string;
    description: string;
    buttonConfirmText: string;
  };
  buttonFunction?: () => void;
  asyncBunttonFuntion?: () => Promise<void>;
};

ReactModal.setAppElement('#root');

export function Modal(props: MoldaTypes) {
  return (
    <ReactModal
      isOpen={props.open}
      className="modal"
      overlayClassName="overlay"
      contentLabel={`${props.content.title} Modal`}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <div className="content-modal">
        <img src={props.content.icon} alt={`${props.content.title} icon`} />
        <h1>{props.content.title}</h1>
        <p>{props.content.description}</p>
        <div className="buttons">
          <Button onClick={props.close}>Cancel</Button>
          <Button
            onClick={() => {
              props.buttonFunction !== undefined && props.buttonFunction();
              props.asyncBunttonFuntion !== undefined &&
                props.asyncBunttonFuntion();
              props.close();
            }}
          >
            {props.content.buttonConfirmText}
          </Button>
        </div>
      </div>
    </ReactModal>
  );
}
