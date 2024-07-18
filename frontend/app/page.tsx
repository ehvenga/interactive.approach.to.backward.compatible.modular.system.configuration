'use client';

import { useState, useEffect } from 'react';

interface Parameter {
  label: string;
}

export default function Home() {
  const [toBeSelectedInitialParamList, setToBeSelectedInitialParamList] =
    useState<Parameter[]>([]);
  const [selectedInitialParameterList, setSelectedInitialParameterList] =
    useState<Parameter[]>([]);

  const handleMoveAllInitialParams = () => {
    return;
  };

  const handleInputParamClicked = (param: Parameter) => {
    return;
  };

  const handleClearAllInitialParams = () => {
    return;
  };

  const handleSelectedInputParamClicked = (param: Parameter) => {
    return;
  };

  return (
    <main className='px-24 py-10'>
      <h1 className='text-3xl font-semibold pb-4'>
        Interactive Configuration Tool
      </h1>
      <div className='border-gray-100 border-2 rounded-2xl p-10'>
        <h2 className='text-xl font-semibold border-b-2'>
          Select Interface Parameters
        </h2>

        <div className='flex gap-3 mt-6'>
          <div className='w-1/2'>
            <div className='flex justify-between border-b mb-2 items-end'>
              <h3 className='font-medium'>Parameter List</h3>
              <h4 className='text-sm'>
                {toBeSelectedInitialParamList.length} items
              </h4>
            </div>
            <div className='h-60 overflow-y-auto text-black rounded bg-gray-50'>
              <h3
                onClick={handleMoveAllInitialParams}
                className='bg-gray-100 border-b border-b-gray-300 hover:bg-gray-200 hover:font-medium hover:text-green-900 h-8 flex justify-center items-center cursor-pointer px-2'
              >
                Move all &rArr;
              </h3>
              {toBeSelectedInitialParamList.map((param, idx) => (
                <div
                  className='bg-gray-100 hover:bg-gray-50 hover:font-medium hover:text-green-700 h-8 flex items-center cursor-pointer px-2'
                  key={idx}
                  onClick={() => handleInputParamClicked(param)}
                >
                  {param.label}
                </div>
              ))}
            </div>
          </div>
          <div className='w-1/2'>
            <div className='flex justify-between border-b mb-2 items-end'>
              <h3 className='font-medium'>Initial Parameters</h3>
              <h4 className='text-sm'>
                {selectedInitialParameterList.length} items
              </h4>
            </div>
            <div className='h-60 overflow-y-auto text-black rounded bg-gray-50'>
              <h3
                onClick={handleClearAllInitialParams}
                className='bg-gray-100 border-b border-b-gray-300 hover:bg-gray-200 hover:font-medium hover:text-red-800 h-8 flex justify-center items-center cursor-pointer px-2'
              >
                &lArr; Clear all
              </h3>
              {selectedInitialParameterList.map((param, idx) => (
                <div
                  className='bg-gray-100 hover:bg-gray-50 hover:font-medium hover:text-red-500 h-8 flex items-center cursor-pointer px-2'
                  key={idx}
                  onClick={() => handleSelectedInputParamClicked(param)}
                >
                  {param.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <div className='w-1/2'>
            <div className='flex justify-between border-b mb-2 items-end'>
              <h3 className='font-medium'>Goal List</h3>
              <h4 className='text-sm'>
                {toBeSelectedInitialParamList.length} items
              </h4>
            </div>
            <div className='h-60 overflow-y-auto text-black rounded bg-gray-50'>
              <h3
                onClick={handleMoveAllInitialParams}
                className='bg-gray-100 border-b border-b-gray-300 hover:bg-gray-200 hover:font-medium hover:text-green-900 h-8 flex justify-center items-center cursor-pointer px-2'
              >
                Move all &rArr;
              </h3>
              {toBeSelectedInitialParamList.map((param, idx) => (
                <div
                  className='bg-gray-100 hover:bg-gray-50 hover:font-medium hover:text-green-700 h-8 flex items-center cursor-pointer px-2'
                  key={idx}
                  onClick={() => handleInputParamClicked(param)}
                >
                  {param.label}
                </div>
              ))}
            </div>
          </div>
          <div className='w-1/2'>
            <div className='flex justify-between border-b mb-2 items-end'>
              <h3 className='font-medium'>Goal Parameters</h3>
              <h4 className='text-sm'>
                {selectedInitialParameterList.length} items
              </h4>
            </div>
            <div className='h-60 overflow-y-auto text-black rounded bg-gray-50'>
              <h3
                onClick={handleClearAllInitialParams}
                className='bg-gray-100 border-b border-b-gray-300 hover:bg-gray-200 hover:font-medium hover:text-red-800 h-8 flex justify-center items-center cursor-pointer px-2'
              >
                &lArr; Clear all
              </h3>
              {selectedInitialParameterList.map((param, idx) => (
                <div
                  className='bg-gray-100 hover:bg-gray-50 hover:font-medium hover:text-red-500 h-8 flex items=center cursor-pointer px-2'
                  key={idx}
                  onClick={() => handleSelectedInputParamClicked(param)}
                >
                  {param.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className='bg-blue-800 px-5 py-3 rounded-lg text-lg text-white mt-6 hover:bg-blue-700'>
          Configure Systems
        </button>
      </div>
    </main>
  );
}
