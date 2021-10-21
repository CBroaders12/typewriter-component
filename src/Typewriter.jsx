import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styles from './Typewriter.component.css';

const Typewriter = ({ textToType, wpm, loop }) => {
  const words = textToType.split(/\s+/);
  const averageWordLength =
    words.map((word) => word.length).reduce((a, b) => a + b) / words.length;
  const delay = Math.round(1 / ((wpm / 60 / 1000) * averageWordLength));

  const initialState = {
    text: '',
    currentIndex: 0,
    finished: false,
  };

  const typewriterReducer = (state, action) => {
    switch (action.type) {
      case 'TYPE':
        return {
          text: state.text + action.payload[state.currentIndex],
          currentIndex: state.currentIndex + 1,
          finished: state.text.length === action.payload.length - 1,
        };
      case 'BACKSPACE':
        return {
          text: state.text.slice(0, -1),
          currentIndex: state.currentIndex - 1,
          finished: state.currentIndex !== 1,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(typewriterReducer, initialState);

  useEffect(() => {
    let timeoutId;
    if (!state.finished) {
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'TYPE',
          payload: textToType,
        });
      }, delay);
    } else if (state.finished && loop) {
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'BACKSPACE',
        });
      }, delay / 2);
    }

    return () => timeoutId && clearTimeout(timeoutId);
  }, [state]);

  return (
    <h1 className={styles.typewriter}>
      {state.text}
      <span className={styles.cursorBar} />
    </h1>
  );
};

Typewriter.propTypes = {
  textToType: PropTypes.string.isRequired,
  loop: PropTypes.bool,
  wpm: PropTypes.number,
};

Typewriter.defaultProps = {
  loop: false,
  wpm: 100,
};

export default Typewriter;
