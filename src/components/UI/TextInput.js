import classes from './TextInput.module.css';
import { useField, ErrorMessage } from "formik";


const TextInput = ({label, className, ...props}) => {
    const [field,meta]=useField(props);
    return (
        <div className={className + ` ${meta.touched && meta.error && classes.invalid}`}>
            <label htmlFor={field.name}>{label}</label>
            <input {...props} {...field}/>
            <ErrorMessage component='p' name={field.name} className={classes.error}/>
        </div>
    );
}

export default TextInput;