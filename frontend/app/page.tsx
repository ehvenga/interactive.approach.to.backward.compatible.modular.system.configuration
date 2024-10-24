'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { stageAtom } from '@/utils/store';

import ChooseParameters from '@/components/ChooseParameters';

export default function Home() {
  return (
    <main className='px-24 py-10'>
      <h1 className='text-3xl font-semibold pb-4 text-gray-700'>
        Interactive Configuration Tool
      </h1>
      <ChooseParameters />
    </main>
  );
}
