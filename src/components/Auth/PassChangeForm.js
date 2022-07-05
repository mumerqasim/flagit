import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import TextInput from '../UI/TextInput';
import AuthContext from '../../store/auth-context';
import classes from './PassChangeForm.module.css';
import urls from '../../store/urls';
import * as Yup from 'yup';
import Modal from '../UI/Modal';
import Spinner from '../UI/Spinner';
import authdraw from '../UI/authdraw.svg';

const PassChangeForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success,setSuccess] = useState(null);

  const validate = Yup.object({
    cpass:Yup.string()
    .required('Current password is required'),
    npass: Yup.string()
    .min(7,'New password must be at least 7 characters')
    .required('New password is required'),
    cnpass: Yup.string()
    .oneOf([Yup.ref('npass'),null],'Passwords must match')
    .required('Confirm password is required')
  });
  return (
    <section className={classes.auth}>
      <Formik
        initialValues={{
          cpass:'',
          npass:'',
          cnpass:''
        }}
        validationSchema={validate}
        onSubmit={values => {
          setIsLoading(true);
          fetch(urls.changePass, {
            method: 'POST',
            body: JSON.stringify({
              userId: authCtx.userId,
              currentPassword: values.cpass,
              newPassword:values.npass
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${authCtx.token}`
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
              setSuccess(true);
              setTimeout(() => {
                setSuccess(null);
                history.replace('/');
              }, 2000); 
            })
            .catch((err) => {
              setTimeout(()=>{setError(null)},3000);
              // alert(err.message);
            });
        }}>
        {formik => (
          <div>
            <h1>Change Password</h1>
            <Form>
              <TextInput label='Current Password' name='cpass' type='password' placeholder="Current Password" className={classes.inputGroup}/>
              <TextInput label='New Password' name='npass' type='password' placeholder="New Password" className={classes.inputGroup}/>
              <TextInput label='Confirm Password' name='cnpass' type='password' placeholder="Confirm New Password" className={classes.inputGroup}/>
              {!isLoading ? <button disabled={success} type='submit'>Change</button>:<Spinner/>}
            </Form>
          </div>
        )}
      </Formik>
      {error ? <Modal type="failure" message={error.message}/>:null}
      {success ? <Modal type="success" message="Password Changed Successfully"/>:null}
    </section>
    
  );
};

export default PassChangeForm;
