'use client';

import React from 'react';
import { useAtom } from 'jotai';

import ChooseParts from '@/components/ChooseParts';
import CurrentSolution from '@/components/CurrentSolution';
import OptimalSolution from '@/components/OptimalSolution';
import { stageAtom } from '@/utils/store';

const Tool: React.FC = () => {
  const [stage, setStage] = useAtom(stageAtom);
  return (
    <main className='px-24 py-10'>
      <h1 className='text-3xl font-semibold pb-4 text-gray-700'>
        Interactive Design System
      </h1>
      <h3 className='pb-3 font-medium text-gray-700'>Stage: {stage}</h3>
      <div className='flex gap-x-5'>
        <CurrentSolution type='sm' />
        <ChooseParts />
      </div>
      {/* Show optimal solution as a reference. You can hide or conditionally show later. */}
      <OptimalSolution type='sm' />
    </main>
  );
};

export default Tool;
