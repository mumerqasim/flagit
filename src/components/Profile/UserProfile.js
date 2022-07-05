import PassChangeForm from '../Auth/PassChangeForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <PassChangeForm />
    </section>
  );
};

export default UserProfile;
