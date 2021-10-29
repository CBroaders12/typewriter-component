import React, { useState } from 'react';
import Typewriter from 'react-looping-typewriter';
import styles from './app.component.css';

// import Typewriter from './Typewriter';

const App = () => {
  const [looping, setLooping] = useState(false);
  const [textToType, setTextToType] = useState('Type me!');
  const [start, setStart] = useState(false);
  const [wpm, setWPM] = useState(60);

  return (
    <main className={styles.app}>
      <div className={styles.container}>
        {start && (
          <Typewriter textToType={textToType} loop={looping} wpm={wpm} />
        )}
      </div>
      <form className={styles.form}>
        <label htmlFor='typewriterInput' className={styles.label}>
          What should I type?
          <br />
          <input
            type='text'
            name='typewriterInput'
            id='typewriterInput'
            className={styles.textInput}
            value={textToType}
            onChange={(e) => setTextToType(e.target.value)}
            disabled={start}
          />
        </label>
        <label htmlFor='wpm' className={styles.label}>
          Words per minute (WPM)
          <br />
          <input
            type='number'
            name='wpm'
            id='wpm'
            step='5'
            className={styles.textInput}
            disabled={start}
            value={wpm}
            onChange={(e) => setWPM(e.target.value)}
          />
        </label>
        <label htmlFor='loopInput' className={styles.label}>
          Loop it?
          <input
            type='checkbox'
            name='loopInput'
            id='loopInput'
            className={styles.checkbox}
            disabled={start}
            onChange={(e) => {
              setLooping(e.target.checked);
            }}
          />
        </label>
        <button
          type='button'
          className={!start ? styles.typeButton : styles.stopButton}
          onClick={() => setStart(!start)}
          disabled={textToType === ''}
        >
          {start ? 'Stop' : 'Type it!'}
        </button>
      </form>
    </main>
  );
};

export default App;
