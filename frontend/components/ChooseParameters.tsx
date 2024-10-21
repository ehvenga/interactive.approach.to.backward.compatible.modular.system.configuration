import React, { useEffect, useState } from 'react';

interface Parameter {
  id: number;
  label: string;
  name: string;
}

const ChooseParameters = () => {
  const [toBeSelectedInitialParamList, setToBeSelectedInitialParamList] =
    useState<Parameter[]>([]);
  const [selectedInitialParameterList, setSelectedInitialParameterList] =
    useState<Parameter[]>([]);
  const [toBeSelectedGoalParamList, setToBeSelectedGoalParamList] = useState<
    Parameter[]
  >([]);
  const [selectedGoalParameterList, setSelectedGoalParameterList] = useState<
    Parameter[]
  >([]);
  const [disableConfigure, setDisableConfigure] = useState<boolean>(true);

  useEffect(() => {
    handleFetchParameterList();
  }, []);

  useEffect(() => {
    selectedInitialParameterList.length > 0 &&
    selectedGoalParameterList.length > 0
      ? setDisableConfigure(false)
      : setDisableConfigure(true);
  }, [selectedInitialParameterList, selectedGoalParameterList]);

  const handleFetchParameterList = () => {
    setToBeSelectedInitialParamList([
      { id: 1, label: 'Param 1', name: 'Parameter 1' },
      { id: 2, label: 'Param 2', name: 'Parameter 2' },
      { id: 3, label: 'Param 3', name: 'Parameter 3' },
    ]);
    setToBeSelectedGoalParamList([
      { id: 4, label: 'Param 4', name: 'Parameter 4' },
      { id: 5, label: 'Param 5', name: 'Parameter 5' },
      { id: 6, label: 'Param 6', name: 'Parameter 6' },
    ]);
  };

  const handleMoveAllInitialParams = () => {
    setSelectedInitialParameterList(toBeSelectedInitialParamList);
    setToBeSelectedInitialParamList([]);
  };

  const handleMoveAllGoalParams = () => {
    setSelectedGoalParameterList(toBeSelectedGoalParamList);
    setToBeSelectedGoalParamList([]);
  };

  const handleClearAllInitialParams = () => {
    setToBeSelectedInitialParamList(selectedInitialParameterList);
    setSelectedInitialParameterList([]);
    return;
  };

  const handleClearAllIGoalParams = () => {
    setToBeSelectedGoalParamList(selectedGoalParameterList);
    setSelectedGoalParameterList([]);
    return;
  };

  const handleInitialInputParamClicked = (param: Parameter) => {
    setSelectedInitialParameterList((prevList) => [...prevList, param]);
    setToBeSelectedInitialParamList((prevList) => {
      const updatedGoalParamList = prevList.filter((p) => p !== param);
      return updatedGoalParamList;
    });
    return;
  };

  const handleGoalInputParamClicked = (param: Parameter) => {
    setSelectedGoalParameterList((prevList) => [...prevList, param]);
    setToBeSelectedGoalParamList((prevList) => {
      const updatedGoalParamList = prevList.filter((p) => p !== param);
      return updatedGoalParamList;
    });
    return;
  };

  const handleSelectedInitialInputParamClicked = (param: Parameter) => {
    return;
  };
  const handleSelectedGoalInputParamClicked = (param: Parameter) => {
    setToBeSelectedGoalParamList((prevList) => [...prevList, param]);
    setSelectedGoalParameterList((prevList) => {
      const updatedGoalParamList = prevList.filter((p) => p !== param);
      return updatedGoalParamList;
    });
    return;
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
                onClick={handleClearAllIGoalParams}
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
        >
          Configure Systems
        </button>
      </div>
    </section>
  );
};

export default ChooseParameters;
