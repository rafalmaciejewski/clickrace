import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { join } from '../actions';
import { getPlayer, getPlayerNames } from '../selectors';
import styles from './RegistrationForm.module.css';

export function RegistrationForm(): JSX.Element {
  const dispatch = useDispatch();
  const playerNames = useSelector(getPlayerNames);
  const { isJoining, joined, name: playerName } = useSelector(getPlayer);
  const [name, setName] = useState(playerName);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();

    if (playerNames.includes(name)) {
      setErrorMessage('This name is already taken');
      return;
    }

    dispatch(join(name));
  }

  const inputClassNames = classNames(
    errorMessage ? [styles.input, styles.inputWithError] : styles.input,
  );

  if (joined) {
    return <div>Hello, {name}! Get ready for a race...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id="name-input">
        Name:
        <input
          aria-labelledby="name-input"
          className={inputClassNames}
          type="text"
          disabled={isJoining}
          value={name}
          onChange={handleInputChange}
        />
        {errorMessage ? <span className={styles.errorMessage}>{errorMessage}</span> : null}
      </label>
      <button type="submit" disabled={isJoining || !!errorMessage || !name || name === ''}>
        Join!
      </button>
    </form>
  );
}
