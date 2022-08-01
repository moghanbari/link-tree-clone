import { Link } from 'react-router-dom';
import TextField from './shared/TextField';
import Button from './shared/Button';
import useFormField from '../hooks/useFormField';

const Login = () => {
  const [username] = useFormField('');
  const [password] = useFormField('');

  return (
    <div className="w-full flex">
      <div className="w-7/12 rounded-lg"></div>
      <div className="w-6/12 rounded-lg">
        <div className="h-44"></div>
        <div className="login-wrapper w-96">
          <h2 className="text-3xl mb-3 font-light">Sign In</h2>
          <p className="text-gray-400 mb-5">
            Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.
          </p>
          <TextField
            placeholder={'Username'}
            {...username}
          />
          <TextField
            placeholder={'Password'}
            type={'password'}
            {...password}
          />

          <div className="grid grid-cols-2">
            <div className="remember-me">
              <label className="md:w-2/3 block text-gray-500 font-normal cursor-pointer">
                <input className="mr-2 leading-tight" type="checkbox" />
                <span className="text-sm">Remember me</span>
              </label>
            </div>
            <div className="forgot-password text-right">
              <span className="text-sm text-red-400 font-normal">Forgot Password?</span>
            </div>
          </div>

          <Button text={'Log In'} />
          <p className="mt-5 mb-4 text-gray-500 text-sm">
            Don't have an account?
            <Link to="/register">
              <span className="text-blue-600 font-thick">{' '}Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
