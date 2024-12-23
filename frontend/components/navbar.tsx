import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 px-24 py-4 flex items-center justify-between gap-x-5 border-b-2 bg-gray-900'>
      <Link href='/' className='flex items-center gap-x-2'>
        <Image
          src='/logo.png'
          width={30}
          height={30}
          alt='Picture of the author'
        />
        <Image
          src='/logo-letter.png'
          width={220}
          height={30}
          alt='Picture of the author'
          className='-mt-[2px]'
        />
      </Link>
      <ul className='flex gap-x-6 text-xl'>
        <li>
          <Link
            href='/db'
            className='text-white hover:text-sky-400 cursor-pointer border-b border-transparent'
          >
            Database
          </Link>
        </li>
        <li>
          <Link
            href='/details'
            className='text-white hover:text-sky-400 cursor-pointer border-b border-transparent'
          >
            Details
          </Link>
        </li>
        <li>
          <Link
            href='/team'
            className='text-white hover:text-sky-400 cursor-pointer border-b border-transparent'
          >
            Team
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
