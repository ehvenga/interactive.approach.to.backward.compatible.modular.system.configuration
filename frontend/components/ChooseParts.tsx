'use client';

import React, { useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAtom } from 'jotai';
import {
  stageAtom,
  partsListAtom,
  partsChosenListAtom,
  viewSolutionAtom,
} from '@/utils/store';
import { useRouter } from 'next/navigation';

interface Parts {
  id: number;
  label: string;
  name: string;
}

const ChooseParts: React.FC = () => {
  const router = useRouter();

  const [stage, setStage] = useAtom(stageAtom);
  const [partsList, setPartsList] = useAtom(partsListAtom);
  const [partsChosenList, setPartsChosenList] = useAtom(partsChosenListAtom);
  const [viewSolution, setViewSolution] = useAtom(viewSolutionAtom);

  useEffect(() => {
    setPartsList([
      { id: 1, label: 'Part 1', name: 'Part 1' },
      { id: 2, label: 'Part 2', name: 'Part 2' },
      { id: 3, label: 'Part 3', name: 'Part 3' },
    ]);
  }, [setPartsList]);

  const handleTogglePart = (part: Parts) => {
    setPartsChosenList((prevList) => {
      if (prevList.find((p) => p.id === part.id)) {
        return prevList.filter((p) => p.id !== part.id);
      }
      return [...prevList, part];
    });
  };

  const handleConfigure = () => {
    setStage(2);
    router.push('/solution');
  };

  const isChosen = (part: Parts): boolean => {
    return partsChosenList.some((chosen) => chosen.id === part.id);
  };

  return (
    <section className='w-2/5'>
      <div className='border-gray-300 bg-gray-50 border rounded-2xl p-10'>
        <div className='flex border-b-2 gap-x-2'>
          <h2 className='text-xl text-gray-600 font-semibold'>List of Parts</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className='border border-gray-400 px-[7px] rounded-full text-sm -translate-y-2'>
                  i
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Only usable parts can be chosen depending on the previous
                  interfaces.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='bg-white h-[51.5vh] mt-6 border-gray-200 border-2 rounded-md'>
          {partsList.map((part) => (
            <div
              className={`h-8 flex items-center cursor-pointer px-2 
                ${
                  isChosen(part)
                    ? 'bg-gray-300 text-gray-500 hover:bg-red-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-50 hover:font-medium hover:text-green-500'
                }`}
              key={part.id}
              onClick={() => handleTogglePart(part)}
            >
              {part.label}
            </div>
          ))}
        </div>
        <div className='flex justify-end'>
          {viewSolution ? (
            <button
              className='bg-sky-500 px-5 py-3 rounded-lg text-lg text-white mt-6 hover:bg-sky-400 disabled:bg-gray-400'
              disabled={!partsChosenList.length}
              onClick={handleConfigure}
            >
              View Final Solution
            </button>
          ) : (
            <button
              className='bg-sky-500 px-5 py-3 rounded-lg text-lg text-white mt-6 hover:bg-sky-400 disabled:bg-gray-400'
              disabled={!partsChosenList.length}
              onClick={handleConfigure}
            >
              Continue Configuration
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChooseParts;
