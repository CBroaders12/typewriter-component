import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const Typewriter = ({ textToType, delay }) => {
  const initialState = {
    text: '',
    currentIndex: 0,
  };

  const typewriterReducer = (state, action) => {
    switch (action.type) {
      case 'TYPE':
        return {
          text: state.text + action.payload[state.currentIndex],
          currentIndex: state.currentIndex + 1,
        };
      case 'BACKSPACE':
        return {
          text: state.text.slice(0, -1),
          currentIndex: state.currentIndex - 1,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(typewriterReducer, initialState);

  useEffect(() => {
    let timeoutId;
    if (state.text.length < textToType.length) {
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'TYPE',
          payload: textToType,
        });
      }, delay);
    }

    return () => {
      return timeoutId && clearTimeout(timeoutId);
    };
  }, [state]);

  return <h1>{state.text}</h1>;
};

Typewriter.propTypes = {
  textToType: PropTypes.string,
  // loop: PropTypes.bool,
  delay: PropTypes.number,
};

Typewriter.defaultProps = {
  textToType: 'Default String',
  // loop: false,
  delay: 200,
};

export default Typewriter;
