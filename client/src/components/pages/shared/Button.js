import React from 'react'

const Button = ({text}) => {
	return (
		<button className="p-4 font-semibold text-base bg-blue-500 hover:bg-blue-400 text-white rounded-md shadow-sm mt-4 w-full">{text}</button>
	)
}

export default Button