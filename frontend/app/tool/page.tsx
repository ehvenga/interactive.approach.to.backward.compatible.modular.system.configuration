import React from 'react';

import ChooseParts from '@/components/ChooseParts';
import CurrentSolution from '@/components/CurrentSolution';
import OptimalSolution from '@/components/OptimalSolution';

const Tool: React.FC = () => {
  return (
    <main className='px-24 py-10'>
      <h1 className='text-3xl font-semibold pb-4 text-gray-700'>
        Interactive Configuration Tool
      </h1>
      <div className='flex gap-x-5'>
        <CurrentSolution />
        <ChooseParts />
      </div>
      {/* Show optimal solution as a reference. You can hide or conditionally show later. */}
      <OptimalSolution type='sm' />
    </main>
  );
};

export default Tool;
