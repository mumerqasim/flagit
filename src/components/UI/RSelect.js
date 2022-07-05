import React, { Component } from 'react'
import Select from 'react-select'

const RSelect = props => {
    let {label, name, options, className, icon, value, ...rest} = props;
    options = options.map(item => ({...item, label:item.value}));
    const customStyles = {
        option: (styles, state) => ({
          ...styles,
          cursor: 'pointer',
        }),
        control: (styles) => ({
          ...styles,
          cursor: 'pointer',
          '&:hover': { borderColor: '#334daca6' }, // border style on hover
          border: '1px solid lightgray', // default border color
        //   '&:active':{border: '5px solid #334dac'}
        })
    }

    return (
        <div className={className}>

            <label htmlFor={name}>{icon} {label}</label>
            <Select name={name} styles={customStyles} options={options} {...rest}/>
        </div>
    );

}

export default RSelect;

