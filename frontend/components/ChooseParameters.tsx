import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  toBeSelectedInitialParamListAtom,
  selectedInitialParameterListAtom,
  toBeSelectedGoalParamListAtom,
  selectedGoalParameterListAtom,
  stageAtom,
} from '@/utils/store';
import { useRouter } from 'next/navigation';

interface Parameter {
  id: number;
  label: string;
  name: string;
}

const ChooseParameters: React.FC = () => {
  const router = useRouter();

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
      { id: 1, label: 'USB 2.0', name: 'i1' },
      { id: 2, label: 'USB 3.0', name: 'i2' },
      { id: 3, label: 'Display Port 1.2', name: 'i3' },
      { id: 4, label: 'Display Port 1.4', name: 'i4' },
      { id: 5, label: 'HDMI 1.4', name: 'i5' },
      { id: 6, label: 'HDMI 2.0', name: 'i6' },
      { id: 7, label: 'PCIe 4.0', name: 'i7' },
      { id: 8, label: 'PCIe 5.0', name: 'i8' },
    ]);
    setToBeSelectedGoalParamList([
      { id: 1, label: 'USB 2.0', name: 'i1' },
      { id: 2, label: 'USB 3.0', name: 'i2' },
      { id: 3, label: 'Display Port 1.2', name: 'i3' },
      { id: 4, label: 'Display Port 1.4', name: 'i4' },
      { id: 5, label: 'HDMI 1.4', name: 'i5' },
      { id: 6, label: 'HDMI 2.0', name: 'i6' },
      { id: 7, label: 'PCIe 4.0', name: 'i7' },
      { id: 8, label: 'PCIe 5.0', name: 'i8' },
    ]);
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

  function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='))
      ?.split('=')[1];
    return cookieValue || '';
  }

  // const handleConfigure = async () => {
  //   setStage(1);
  //   const csrfToken = getCookie('csrftoken');
  //   const response = await fetch('http://127.0.0.1:8000/show_result', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-CSRFToken': csrfToken,
  //     },
  //     body: JSON.stringify({
  //       initials: ['p1', 'p10'], // Matches request.POST.getlist('initials')
  //       knowledges: ['p11', 'p15'], // Matches request.POST.getlist('knowledges')
  //       depth: 0, // Matches request.POST.get('depth')
  //       child: 0, // Matches request.POST.get('child')
  //     }),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     console.log('API Response:', data);
  //   } else {
  //     console.error('API Error:', data);
  //   }
  //   router.push('/tool');
  // };

  const handleConfigure = async () => {
    const csrfToken = getCookie('csrftoken'); // Ensure CSRF cookie is available
    const response = await fetch('http://127.0.0.1:8002/api/get_result/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({
        initials: ['PR1', 'PR3'], // Initials parameter
        knowledges: ['PR7', 'PR8'], // Goals parameter
        depth: '0', // Depth parameter
        child: '0', // Child parameter
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('API Response:', data);
    } else {
      console.error('API Error:', data);
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
    </section>
  );
};

export default ChooseParameters;
