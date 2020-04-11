import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginPOST } from '../services/backend';
import { setCurrentSession, getAxios422ResponseMsg } from 'utils';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  // Input,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setErrorMsg('');
      if (loading) return;
      setLoading(true);
      const result = await loginPOST({
        data: {
          email: email === 'demo' ? 'demo@test.com' : email,
          password,
        },
      });

      if (result && result.token) {
        setCurrentSession(result);
        window.location.href = '/';
        return;
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      const msg = getAxios422ResponseMsg(e);
      setErrorMsg(msg);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            value={email}
            onChange={onChangeEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={onChangePassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControl error={errorMsg?.length ? true : false}>
            <FormHelperText id="my-helper-text">{errorMsg}</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
