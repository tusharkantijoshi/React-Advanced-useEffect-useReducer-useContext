import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';

//! Validation logic for email input field
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

//! Validation logic for email input field
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef(); //!  using ref to connect input element 
  const passwordInputRef = useRef(); //!  using ref to connect input element  

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {

    /*     
    ! using set timeout for doing the form validation after a delay, for example, send an HTTP request to some backend where you check if a username is already in use. You don't wanna do that with every keystroke. Because if you do, that means you're going to be sending a lot of requests that might be a lot of unnecessary network traffic.
     */
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    //! this is a cleanup function, whenever this useEffect function runs before it runs, except for the very first time when it runs this cleanup function will run.
    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier); //! clearTimeout() is a build in browser function 
    };
  }, [emailIsValid, passwordIsValid]); //! [] -> array of dependencies. useEffect function will only run if any dependencies/ state changes. empty [] specify no dependencies, useEffect will run once when our component starts up because thereafter the dependencies/ state never change

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  //! validation logic
  const submitHandler = (event) => {

    event.preventDefault(); //! to prevent reload of the entire page after submitting

    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus(); //! using ref to connect input element 
    } else {
      passwordInputRef.current.focus(); //! using ref to connect input element
    }
    //! focus = whenever the inputs blur, so whenever they lose focus, so that they also are marked as invalid if I just click in there, enter nothing and click somewhere else.
  };

  return (
    <Card className={classes.login}>

      <form onSubmit={submitHandler}>

        <Input
          ref={emailInputRef} //! using ref attribute for the connection (useRef() hook)
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}  //! using value attribute for the connection (useState() hook)
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}  //! using ref attribute for the connection (useRef() hook)
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value} //! using value attribute for the connection (useState() hook)
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>

      </form>

    </Card>
  );
};

export default Login;
