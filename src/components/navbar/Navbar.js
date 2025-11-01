import SarinaFontWrapper from '../sarinaF/sarinaFontWrapper';
import NavItem from './NavItem';
import Image from 'next/image';
const Navbar = ({ session }) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="bg-primary1 flex justify-center mb-5 pt-3">
          <Image
            src="/images/logo.png"
            height={50}
            width={200}
            alt="Brand Name"
          />
        </div>
        <div>
          <NavItem session={session} />
        </div>
      </div>
     
    </div>
  );
};

export default Navbar;
