import { Sarina } from 'next/font/google';

const sarina = Sarina({
  weight: '400',
  subsets: ['latin'],
});

const SarinaFontWrapper = ({ children }) => {
  return <div className={`${sarina.className}`}>{children}</div>;
};

export default SarinaFontWrapper;
