import classes from './Modal.module.css';
import {BiError,BiCheckCircle} from 'react-icons/bi';

const Modal = props => {
    return (
        <div className={classes.modal + ` ${props.type==='success' ? classes.success : classes.failure}`}>
            {props.type==='success' ?  <BiCheckCircle/> : <BiError/> }
            {props.message}
        </div>
    )
}

export default Modal;