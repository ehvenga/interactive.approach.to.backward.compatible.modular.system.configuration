import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const CurrentSolution: React.FC = () => {
  return (
    <section className='w-3/5'>
      <div className='border-gray-300 bg-gray-50 border rounded-2xl p-10'>
        <div className='flex border-b-2 gap-x-2'>
          <h2 className='text-xl text-gray-600 font-semibold'>
            Current Solution
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className='border border-gray-400 px-[7px] rounded-full text-sm -translate-y-2'>
                  i
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>A preview of current chosen solution</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='bg-white h-[60vh] mt-6 border-gray-200 border-2 rounded-md'></div>
      </div>
    </section>
  );
};

export default CurrentSolution;
