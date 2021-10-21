import React, { useState } from 'react';
// import styles from './app.component.css';

import Typewriter from './Typewriter';

/* eslint-disable arrow-body-style */
const App = () => {
  const [looping, setLooping] = useState(false);
  const [textToType, setTextToType] = useState('');
  const [start, setStart] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setStart(!start);
  };

  return (
    <>
      {start && <Typewriter textToType={textToType} loop={looping} />}
      <form onSubmit={handleSubmit}>
        <label htmlFor='typewriterInput'>
          What should I type?
          <br />
          <input
            type='text'
            name='typewriterInput'
            id='typewriterInput'
            value={textToType}
            onChange={(e) => setTextToType(e.target.value)}
          />
        </label>
        <label htmlFor='looping'>
          Loop it?
          <input
            type='checkbox'
            onChange={(e) => {
              setLooping(e.target.checked);
            }}
          />
        </label>
        <button type='submit'>{start ? 'Stop' : 'Type it!'}</button>
      </form>
    </>
  );
};

export default App;
