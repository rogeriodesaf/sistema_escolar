import React from 'react'
import styles from './Inputs.module.css'


function Input({ 
    type,
    text,
    name,
    placeholder,
    handleOnChange,
    value,
    multiple,
    textarea 
}) {
    return (
        <div className= {styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name ={name} id = {name} placeholder={placeholder} textarea ={textarea}
            onChange = {handleOnChange} value = {value} {...(multiple ? {multiple} : '')}/>

        </div>
    )

}

export default Input