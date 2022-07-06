import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {FiEdit} from 'react-icons/fi';
import {RiLockPasswordLine, RiLogoutCircleRLine} from 'react-icons/ri'
import urls from '../../store/urls';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const [dropDownShown,setDropDownShown] = useState(false);
  const menuRef = useRef();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;

  const logoutHandler = () => {
    authCtx.logout();
    setDropDownShown(false);
    // optional: redirect the user
  };

  const dropDownHandler = () => {
    setDropDownShown(prev => !prev)
  }

  const closeOpenMenu = (e)=>{
    if(menuRef.current && dropDownShown && !menuRef.current.contains(e.target)){
      setDropDownShown(false)
    }
}

  document.addEventListener('mousedown',closeOpenMenu)
  return (
    <header className={classes.header}>
      <div className={classes.navContainer}>
      <Link to='/flagit'>
        <h1 className={classes.logo}>Flag<span>it.</span></h1>
      </Link>
      <nav onClick={dropDownHandler} ref={menuRef}>
        {isLoggedIn && <button className={dropDownShown ? classes.DropDownButton : classes.DropDownButtont} >{dropDownShown ? <AiOutlineClose />:<AiOutlineMenu/>}</button>}
        {dropDownShown && isLoggedIn && (
        <ul>
            <li>
              <Link to='/change-password'><RiLockPasswordLine/> Change Password</Link>
            </li>
            <li>
              <Link to='/flagit' onClick={logoutHandler}><RiLogoutCircleRLine/> Logout</Link>
            </li>
            {isAdmin && <li>
              <a href={urls.admin} target='_blank'><FiEdit/> Edit Db</a>
            </li>}
        </ul>)}
      </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
