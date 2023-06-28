import React from 'react'
import styles from './Select.module.css'

function Select({ text, name, disciplinas, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
            >
                <option>Selecione uma disciplina</option>
                {disciplinas.map((disciplina) => (
                    <option key={disciplina._id} value={disciplina._id}>
                        {disciplina.nome}
                    </option>
                ))}
            </select>


        </div>
    )
}

export default Select