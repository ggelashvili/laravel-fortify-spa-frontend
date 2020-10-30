import React from 'react'

const Button = ({children, className, ...props}) => {
    return (
        <button
            className={`uppercase text-md px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ${className}`}
            type="button"
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
