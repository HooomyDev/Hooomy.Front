import React from "react";

export default function InputField({
    label, 
    name, 
    register, 
    error, 
    type = 'text' 
}) {
    return (
        <div className="input-field">
            <label className='input-label'>{label}</label>
            <input
                type={type}
                name={name}
                {...register(name)}
                />
            {error && <span className="error-span">{error}</span>}
        </div>
    );
}