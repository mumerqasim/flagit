const SelectInput = props => {

    const {label, name, options, className, value, ...rest} = props;
    return (
        <div className={className}>
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} value={value} {...rest}>
            {options.map((option,index) => {
                        return(<option key={option.key} value={`${index===0 ? '' : option.value}`} selected={index===0} disabled={index===0}>
                            {option.value}
                        </option>)
            })}
            </select>
        </div>
    );
}

export default SelectInput;