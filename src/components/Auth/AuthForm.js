import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import TextInput from '../UI/TextInput';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import urls from '../../store/urls';
import * as Yup from 'yup';
import Modal from '../UI/Modal';
import Spinner from '../UI/Spinner';
import authdraw from '../UI/authdraw.svg';

const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validate = Yup.object({
    email:Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
    password: Yup.string()
    .min(7,'Password must be at least 7 characters')
    .required('Password is required')
  });
  console.log(isLoading);
  return (
    <section className={classes.auth}>
      <Formik
        initialValues={{
          email:'',
          password:''
        }}
        validationSchema={validate}
        onSubmit={values => {
          setIsLoading(true);
          fetch(urls.login, {
            method: 'POST',
            body: JSON.stringify({
              identifier: values.email,
              password: values.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              setIsLoading(false);
              if (res.ok) {
                return res.json();
              } else {
                return res.json().then((data) => {
                  setError(data.error)
                });
              }
            })
            .then((data) => {
              authCtx.login(data.jwt,data.user.confirmed,data.user.id);
              history.replace('/');
            })
            .catch((err) => {
              setTimeout(()=>{setError(null)},3000);
              // alert(err.message);
            });
        }}>
        {formik => (
          <div>
            <h1>Login</h1>
            <Form>
              <TextInput label='Email' name='email' type='email' placeholder="Email" className={classes.inputGroup}/>
              <TextInput label='Password' name='password' type='password' placeholder="Password" className={classes.inputGroup}/>
              {!isLoading ? <button type='submit'>Sign in</button>:<Spinner/>}
            </Form>
          </div>
        )}
      </Formik>
      {error ? <Modal type="failure" message={error.message}/>:null}
    </section>
    
  );
};

export default AuthForm;
