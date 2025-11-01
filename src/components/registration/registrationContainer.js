import SarinaFontWrapper from '../sarinaF/sarinaFontWrapper';
import Link from 'next/link';
import RegistrationForm from './registrationForm';

const RegestrationContainer = () => {
  return (
    <div className="bg-surface1 w-[872px] min-height-[557px] px-[142px] py-[86px] rounded-[30px] text-center">
     <div className="flex justify-center items-center">
                <img  style={{width: 220, height: 100,paddingBottom: 20}} 
                src='/images/logo.png'  />
                </div>
      <RegistrationForm />
       <p className="text-text2 mt-5">
        Have an account?{' '}
        <Link className="text-primary1 font-bold" href="/">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegestrationContainer;
