import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='px-24 py-4 flex items-center justify-between gap-x-5 border-b-2 border-blue-100 bg-blue-900'>
      <Link href='/' className='flex items-center gap-x-2'>
        {/* <Image
          src='/logo.png'
          width={30}
          height={30}
          alt='Picture of the author'
        />
        <Image
          src='/logo-letter.png'
          width={200}
          height={50}
          alt='Picture of the author'
        /> */}
        <p className='text-white text-2xl font-semibold'>Configable</p>
      </Link>
      <ul className='flex gap-x-6 text-xl'>
        <li>
          <Link
            href='/tool'
            className='font-medium text-white cursor-pointer border-b border-transparent hover:border-b hover:border-white'
          >
            Tool
          </Link>
        </li>
        <li>
          <Link
            href='/paper'
            className='font-medium text-white cursor-pointer border-b border-transparent hover:border-b hover:border-white'
          >
            Paper
          </Link>
        </li>
        <li>
          <Link
            href='/team'
            className='font-medium text-white cursor-pointer border-b border-transparent hover:border-b hover:border-white'
          >
            Team
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
