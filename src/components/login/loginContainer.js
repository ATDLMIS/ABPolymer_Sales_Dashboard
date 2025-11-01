import SarinaFontWrapper from '../sarinaF/sarinaFontWrapper';
import LoginForm from './loginForm';
import Link from 'next/link';

const LoginContainer = () => {
  return (
    <div className="bg-surface1 w-[872px] min-height-[557px] px-[142px] py-[86px] rounded-[30px] text-center">
     
 <div className="flex justify-center items-center">
                <img  style={{width: 220, height: 100,paddingBottom: 20}} 
                src='/images/logo.png'  />
                
                   
                </div>
     
      <LoginForm />
       <p className="text-text2 mt-5">
        Don't have an account?{' '}
        <Link className="text-primary1 font-bold" href="/sign-up">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginContainer;
