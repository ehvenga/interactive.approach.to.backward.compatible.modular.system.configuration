import React from 'react';

import ChooseParts from '@/components/ChooseParts';

const Tool: React.FC = () => {
  return (
    <main className='px-24 py-10'>
      <h1 className='text-3xl font-semibold pb-4 text-gray-700'>
        Interactive Configuration Tool
      </h1>
      <ChooseParts />
    </main>
  );
};

export default Tool;
