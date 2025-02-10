import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Form } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 20,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
}));

export default function SignUp({ onSubmit }) {
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const signupData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    };
    if (validateInputs(signupData)) {
      const validatedInputsToSend = {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password
      }
      onSubmit(validatedInputsToSend);
    }
  };

  const validateInputs = ({ username, email, password, confirmPassword }) => {
    let isValid = true;

    // Username validation
    if (!username || username.length < 3) {
      setUsernameError(true);
      setUsernameErrorMessage('Username must be at least 3 characters long.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    // Password validation
    if (!password || password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    return isValid;
  };

  const lightTheme = createTheme({ palette: { mode: 'light' } });

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" sx={{ boxShadow: 2, borderRadius: 3 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(1rem, 8vw, 2rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component={Form}
            onSubmit={handleSubmit}
            method="post"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              error={usernameError}
              helperText={usernameErrorMessage}
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="username"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={usernameError ? 'error' : 'primary'}
            />

            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
            />

            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />

            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <TextField
              error={confirmPasswordError}
              helperText={confirmPasswordErrorMessage}
              name="confirmPassword"
              placeholder="••••••"
              type="password"
              id="confirmPassword"
              required
              fullWidth
              variant="outlined"
              color={confirmPasswordError ? 'error' : 'primary'}
            />

            <FormControlLabel
              control={<Checkbox value="agree" color="primary" required />}
              label="I agree to the Terms of Service"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign up
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <span>
                <Link
                  to="/signin"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign in
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </ThemeProvider>
  );
}
