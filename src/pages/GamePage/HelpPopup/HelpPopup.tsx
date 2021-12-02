import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import classes from './HelpPopup.module.css';
import santaIcon from '../../../assets/santa-claus.png';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

const HelpPopup = (props: SimpleDialogProps) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Правила игры</DialogTitle>
      <div className={classes['help-popup__content']}>
        <span>
          Хоу! Хоу! Хоу!
          <img
            src={santaIcon}
            alt="santa"
            className={classes['help-popup__santa-image']}
          />
        </span>
        <span>Добро пожаловать в самую новогоднюю игру!</span>
        <span>
          Наш горячо любимый Санта растерял все подарки пока летел на своих
          северных оленях к детям. Помоги дедушке собрать праздничные сюрпризы.
          Дедушка хоть и волшебник, но он не умеет проходить сквозь препятствия,
          имей это в виду! Кстати, наш Санта-то с огоньком. Будь осторожен, не
          сожги весь лес!
        </span>
        <div className={classes['help-popup__control-keys']}>
          <div className={classes['help-popup__control-keys-line']}>
            <div className={classes['help-popup__control-key']}>SPACE</div>
            <span className={classes['help-popup__control-key-discription']}>
              - прыжок
            </span>
          </div>
          <div className={classes['help-popup__control-keys-line']}>
            <div className={classes['help-popup__control-key']}>K</div>
            <span className={classes['help-popup__control-key-discription']}>
              - огненный удар
            </span>
          </div>
          <div className={classes['help-popup__control-keys-line']}>
            <div className={classes['help-popup__control-key']}>ENTER</div>
            <span className={classes['help-popup__control-key-discription']}>
              - открыть FULL SCREEN
            </span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HelpPopup;
