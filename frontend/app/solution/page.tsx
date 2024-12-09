import React from 'react';

import OptimalSolution from '@/components/OptimalSolution';
import CurrentSolution from '@/components/CurrentSolution';

const Solution: React.FC = () => {
  return (
    <main className='px-24 py-10'>
      <h1 className='text-3xl font-semibold pb-4 text-gray-700'>
        Interactive Configuration Tool
      </h1>
      {/* <OptimalSolution type='xl' /> */}
      <CurrentSolution type='xl' />
    </main>
  );
};

export default Solution;
