'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  toBeSelectedInitialParamListAtom,
  selectedInitialParameterListAtom,
  toBeSelectedGoalParamListAtom,
  selectedGoalParameterListAtom,
  stageAtom,
  optimalResultAtom,
} from '@/utils/store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
// import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Parameter {
  id: number;
  label: string;
  name: string;
}

const ChooseParameters: React.FC = () => {
  const router = useRouter();
  const isFirstRender = useRef(true);

  const [stage, setStage] = useAtom(stageAtom);
  const [toBeSelectedInitialParamList, setToBeSelectedInitialParamList] =
    useAtom(toBeSelectedInitialParamListAtom);
  const [selectedInitialParameterList, setSelectedInitialParameterList] =
    useAtom(selectedInitialParameterListAtom);
  const [toBeSelectedGoalParamList, setToBeSelectedGoalParamList] = useAtom(
    toBeSelectedGoalParamListAtom
  );
  const [selectedGoalParameterList, setSelectedGoalParameterList] = useAtom(
    selectedGoalParameterListAtom
  );
  const [optimalResult, optimalSetResult] = useAtom(optimalResultAtom);
  const [disableConfigure, setDisableConfigure] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      handleFetchParameterList();
    }
  }, []);

  useEffect(() => {
    selectedInitialParameterList.length > 0 &&
    selectedGoalParameterList.length > 0
      ? setDisableConfigure(false)
      : setDisableConfigure(true);
  }, [selectedInitialParameterList, selectedGoalParameterList]);

  const handleFetchParameterList = async () => {
    const response = await fetch('http://127.0.0.1:8002/api/parameters/');
    const data = await response.json();

    if (response.ok) {
      // console.log(data);
      const transformedData = data.map((item) => ({
        id: item.parameterid, // Use parameterid for id
        label: item.parametername, // Use parametername for label
        name: item.parameterid, // Use parameterid for name
      }));

      setToBeSelectedInitialParamList(transformedData);
      setToBeSelectedGoalParamList(transformedData);
    }
  };

  const handleMoveAllInitialParams = () => {
    setSelectedInitialParameterList((prevList) => [
      ...prevList,
      ...toBeSelectedInitialParamList.filter(
        (param) => !prevList.some((p) => p.id === param.id)
      ),
    ]);
    setToBeSelectedInitialParamList([]);
  };

  const handleMoveAllGoalParams = () => {
    setSelectedGoalParameterList((prevList) => [
      ...prevList,
      ...toBeSelectedGoalParamList.filter(
        (param) => !prevList.some((p) => p.id === param.id)
      ),
    ]);
    setToBeSelectedGoalParamList([]);
  };

  const handleClearAllInitialParams = () => {
    setToBeSelectedInitialParamList((prevList) => [
      ...prevList,
      ...selectedInitialParameterList.filter(
        (param) => !prevList.some((p) => p.id === param.id)
      ),
    ]);
    setSelectedInitialParameterList([]);
  };

  const handleClearAllGoalParams = () => {
    setToBeSelectedGoalParamList((prevList) => [
      ...prevList,
      ...selectedGoalParameterList.filter(
        (param) => !prevList.some((p) => p.id === param.id)
      ),
    ]);
    setSelectedGoalParameterList([]);
  };

  const handleInitialInputParamClicked = (param: Parameter) => {
    setSelectedInitialParameterList((prevList) => [...prevList, param]);
    setToBeSelectedInitialParamList((prevList) =>
      prevList.filter((p) => p.id !== param.id)
    );
  };

  const handleGoalInputParamClicked = (param: Parameter) => {
    setSelectedGoalParameterList((prevList) => [...prevList, param]);
    setToBeSelectedGoalParamList((prevList) =>
      prevList.filter((p) => p.id !== param.id)
    );
  };

  const handleSelectedInitialInputParamClicked = (param: Parameter) => {
    setToBeSelectedInitialParamList((prevList) => [...prevList, param]);
    setSelectedInitialParameterList((prevList) =>
      prevList.filter((p) => p.id !== param.id)
    );
  };

  const handleSelectedGoalInputParamClicked = (param: Parameter) => {
    setToBeSelectedGoalParamList((prevList) => [...prevList, param]);
    setSelectedGoalParameterList((prevList) =>
      prevList.filter((p) => p.id !== param.id)
    );
  };

  const handleReset = () => {
    handleClearAllInitialParams();
    handleClearAllGoalParams();
  };

  function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='))
      ?.split('=')[1];
    return cookieValue || '';
  }

  const handleConfigure = async () => {
    setStage(1);
    const selectedInitialsIds = selectedInitialParameterList.map(
      (item) => item.id
    );
    const selectedGoalIds = selectedGoalParameterList.map((item) => item.id);
    const csrfToken = getCookie('csrftoken');
    const response = await fetch('http://127.0.0.1:8002/api/get_result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({
        // initials: ['pr1'],
        initials: selectedInitialsIds,
        // goals: ['pr7'],
        goals: selectedGoalIds,
        depth: '0',
        child: '0',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // console.log('API Response:', data);
      if (data.results && data.results.length > 0) {
        optimalSetResult(data.results);
        router.push('/tool');
      } else {
        setErrorTitle('Solution not found');
        setErrorMessage(
          'There is no feasible solution for the Initial and Goal Parameters chosen.'
        );
        setShowDialog(true);
      }
    } else {
      console.error('API Error:', data);
      if (
        data.error ==
        'Parameter ID not found: Parameterlist matching query does not exist.'
      ) {
        setErrorTitle('Error: Parameter not found');
        setErrorMessage(
          'The chosen parameters do not exist in the database, Please choose other parameters.'
        );
        setShowDialog(true);
      } else {
        setErrorTitle('Error Occurred');
        setErrorMessage(data.error);
        setShowDialog(true);
      }
    }
  };

  return (
    <section>
      <div className='border-gray-300 bg-gray-50 border rounded-2xl p-10'>
        <h2 className='text-xl text-gray-600 font-semibold border-b-2'>
          Select Interface Parameters
        </h2>

        <div className='flex gap-3 mt-6'>
          <div className='w-1/2'>
            <div className='flex justify-between border-b mb-2 items-end'>
              <h3 className='font-medium text-gray-500'>Parameter List</h3>
              <h4 className='text-sm'>
                {toBeSelectedInitialParamList.length} items
              </h4>
            </div>
            <div className='h-60 overflow-y-auto text-black rounded bg-white border-gray-200 border'>
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
                  onClick={() => handleInitialInputParamClicked(param)}
                >
                  {param.label}
                </div>
              ))}
            </div>
          </div>

          <div className='w-1/2'>
            <div className='flex justify-between border-b mb-2 items-end'>
              <h3 className='font-medium text-gray-500'>Initial Parameters</h3>
              <h4 className='text-sm'>
                {selectedInitialParameterList.length} items
              </h4>
            </div>
            <div className='h-60 overflow-y-auto text-black rounded bg-white border-gray-200 border'>
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
                  onClick={() => handleSelectedInitialInputParamClicked(param)}
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
              <h3 className='font-medium text-gray-500'>Goal List</h3>
              <h4 className='text-sm'>
                {toBeSelectedGoalParamList.length} items
              </h4>
            </div>
            <div className='h-60 overflow-y-auto text-black rounded bg-white border-gray-200 border'>
              <h3
                onClick={handleMoveAllGoalParams}
                className='bg-gray-100 border-b border-b-gray-300 hover:bg-gray-200 hover:font-medium hover:text-green-900 h-8 flex justify-center items-center cursor-pointer px-2'
              >
                Move all &rArr;
              </h3>
              {toBeSelectedGoalParamList.map((param, idx) => (
                <div
                  className='bg-gray-100 hover:bg-gray-50 hover:font-medium hover:text-green-700 h-8 flex items-center cursor-pointer px-2'
                  key={idx}
                  onClick={() => handleGoalInputParamClicked(param)}
                >
                  {param.label}
                </div>
              ))}
            </div>
          </div>
          <div className='w-1/2'>
            <div className='flex justify-between border-b mb-2 items-end'>
              <h3 className='font-medium text-gray-500'>Goal Parameters</h3>
              <h4 className='text-sm'>
                {selectedGoalParameterList.length} items
              </h4>
            </div>
            <div className='h-60 overflow-y-auto text-black rounded bg-white border-gray-200 border'>
              <h3
                onClick={handleClearAllGoalParams}
                className='bg-gray-100 border-b border-b-gray-300 hover:bg-gray-200 hover:font-medium hover:text-red-800 h-8 flex justify-center items-center cursor-pointer px-2'
              >
                &lArr; Clear all
              </h3>
              {selectedGoalParameterList.map((param, idx) => (
                <div
                  className='bg-gray-100 hover:bg-gray-50 hover:font-medium hover:text-red-500 h-8 flex items=center cursor-pointer px-2'
                  key={idx}
                  onClick={() => handleSelectedGoalInputParamClicked(param)}
                >
                  {param.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className='bg-sky-500 px-5 py-3 rounded-lg text-lg text-white mt-6 hover:bg-sky-400 disabled:bg-gray-400'
          disabled={disableConfigure}
          onClick={handleConfigure}
        >
          Configure Systems
        </button>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{errorTitle}</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleReset}>Reset</AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowDialog(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ChooseParameters;
