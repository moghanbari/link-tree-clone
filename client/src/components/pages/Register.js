import React from 'react';
import TextField from './shared/TextField';
import Button from './shared/Button';
import { Link } from 'react-router-dom';

const Register = () => {
	return (
		<div className="w-full flex">
			<div className="w-7/12 rounded-lg"></div>
			<div className="w-6/12 rounded-lg">
				<div className="h-44"></div>
				<div className="login-wrapper w-96">
					<h2 className="text-3xl mb-3 font-light">Sign Up</h2>
					<p className="text-gray-400 mb-5">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
					
					<TextField placeholder={'Your Name'} />
					<TextField placeholder={'Email'} />
					<TextField placeholder={'UserName'} />
					<TextField placeholder={'Password'} type={'password'} />

					<Button text={'Register'} />
					<p className="mt-5 mb-4 text-gray-500 text-sm">Already have an account? <Link to="/login"><span className="text-blue-600 font-thick">Login</span></Link></p>
				</div>
			</div>
		</div>
	);
};

export default Register;
