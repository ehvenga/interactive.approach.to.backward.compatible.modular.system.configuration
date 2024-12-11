'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { stageAtom } from '@/utils/store';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import ChooseParameters from '@/components/ChooseParameters';

export default function Home() {
  return (
    <main className='px-24 py-10'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold pb-4 text-gray-700'>
          Interactive Design System
        </h1>
        <div className='flex items-center space-x-2'>
          <Switch id='airplane-mode' />
          <Label htmlFor='airplane-mode' className='text-lg'>
            Backward Compatibility
          </Label>
        </div>
      </div>
      <ChooseParameters />
    </main>
  );
}
