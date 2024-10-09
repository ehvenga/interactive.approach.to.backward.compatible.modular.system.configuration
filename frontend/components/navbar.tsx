'use client'; // This marks the component as a Client Component

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const pathname = usePathname(); // Hook for getting the current path

  const isActive = (path: string) => pathname === path;

  return (
    <nav className='px-24 py-4 flex items-center justify-between gap-x-5 border-b-2 bg-gray-900'>
      <Link href='/' className='flex items-center gap-x-2'>
        <Image
          src='/logo.png'
          width={30}
          height={30}
          alt='Picture of the author'
        />
        <Image
          src='/logo-letter.png'
          width={180}
          height={30}
          alt='Picture of the author'
          className='-mt-[2px]'
        />
      </Link>
      <ul className='flex gap-x-6 text-xl'>
        <li>
          <Link
            href='/optimal-tool'
            className={`cursor-pointer border-b border-transparent ${
              isActive('/optimal-tool')
                ? 'text-sky-400 border-sky-400'
                : 'text-white hover:text-sky-400'
            }`}
          >
            Optimal Tool
          </Link>
        </li>
        <li>
          <Link
            href='/details'
            className={`cursor-pointer border-b border-transparent ${
              isActive('/details')
                ? 'text-sky-400 border-sky-400'
                : 'text-white hover:text-sky-400'
            }`}
          >
            Details
          </Link>
        </li>
        <li>
          <Link
            href='/team'
            className={`cursor-pointer border-b border-transparent ${
              isActive('/team')
                ? 'text-sky-400 border-sky-400'
                : 'text-white hover:text-sky-400'
            }`}
          >
            Team
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
