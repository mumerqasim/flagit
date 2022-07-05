import Styles from './Button.module.css';

const Button = props => {
    return <button {...props.config}>{props.text}</button>
}

export default Button;