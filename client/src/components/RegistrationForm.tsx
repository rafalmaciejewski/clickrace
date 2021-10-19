import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  if (joined) {
    return (
      <Typography className={styles.welcomeMessage}>
        Hello, <strong>{name}</strong>! Get ready for a race...
      </Typography>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1}>
        <TextField
          id="standard-search"
          label="Please enter your name"
          type="search"
          variant="standard"
          inputProps={{
            maxLength: 50,
          }}
          autoComplete="off"
          onChange={handleInputChange}
        />
        {errorMessage ? <div className={styles.errorMessage}>{errorMessage}</div> : null}
        <Button type="submit" disabled={isJoining || !!errorMessage || !name || name === ''}>
          Join!
        </Button>
      </Stack>
    </form>
  );
}
