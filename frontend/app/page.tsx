'use client';

import { useState, useEffect } from 'react';

import ChooseParameters from '@/components/ChooseParameters';
import { useAtom } from 'jotai';
import { stageAtom } from '@/utils/store';

export default function Home() {
  const [stage, setStage] = useAtom(stageAtom);

  return (
    <main className='px-24 py-10'>
      <h1 className='text-3xl font-semibold pb-4 text-gray-700'>
        Interactive Configuration Tool
      </h1>
      <ChooseParameters />
    </main>
  );
}
