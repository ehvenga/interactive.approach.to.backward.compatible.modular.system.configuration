'use client';

import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  stageAtom,
  partsListAtom,
  partsChosenListAtom,
  partsFromParametersAtom,
  maxAllowedToBeSelectedPartsAtom,
  currentSolutionAtom,
  goalIDAtom,
  isGoalAchievedAtom,
} from '@/utils/store';
import { useRouter } from 'next/navigation';

interface Parts {
  webserviceid: string;
  webservicename: string;
  input_parameters: string[];
  output_parameters: string[];
  stage: number;
}

const ChooseParts: React.FC = () => {
  const router = useRouter();
  const [stage, setStage] = useAtom(stageAtom);
  const [partsList, setPartsList] = useAtom(partsListAtom);
  const [partsChosenList, setPartsChosenList] = useAtom(partsChosenListAtom);
  const [partsFromParameters, setPartsFromParameters] = useAtom(
    partsFromParametersAtom
  );
  const [maxAllowedToBeSelectedParts, setMaxAllowedToBeSelectedParts] = useAtom(
    maxAllowedToBeSelectedPartsAtom
  );
  const [currentSolution, setCurrentSolution] = useAtom(currentSolutionAtom);
  const [goalIDs] = useAtom(goalIDAtom);
  const [isGoalAchieved, setIsGoalAchieved] = useAtom(isGoalAchievedAtom);

  const [handleConfigDisable, setHandleConfigDisable] = useState(true);

  useEffect(() => {
    setPartsList(partsFromParameters);
  }, [partsFromParameters]);

  useEffect(() => {
    // If no parts chosen, disable the configuration.
    if (partsChosenList.length === 0) {
      setHandleConfigDisable(true);
      return;
    }

    // If parts chosen are within allowed limit and not zero, enable configuration.
    if (
      partsChosenList.length <= maxAllowedToBeSelectedParts &&
      partsChosenList.length > 0
    ) {
      setHandleConfigDisable(false);
    } else {
      if (maxAllowedToBeSelectedParts === 0 && partsChosenList.length > 0) {
        // Possibly goal reached
        setHandleConfigDisable(false);
      } else {
        setHandleConfigDisable(true);
      }
    }
  }, [maxAllowedToBeSelectedParts, partsChosenList]);

  const getCookie = (name: string) => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='))
      ?.split('=')[1];
    return cookieValue || '';
  };

  const checkGoalAchievement = (chosenParts: Parts[]) => {
    const chosenOutputs = [
      ...new Set(chosenParts.flatMap((item) => item.output_parameters)),
    ];
    const goalSet = new Set(goalIDs);
    const chosenSet = new Set(chosenOutputs);

    for (let g of goalSet) {
      if (!chosenSet.has(g)) {
        return false;
      }
    }
    return true;
  };

  const handleTogglePart = (part: Parts) => {
    setPartsChosenList((prevList) => {
      let updatedList: Parts[];
      if (prevList.find((p) => p.webserviceid === part.webserviceid)) {
        updatedList = prevList.filter(
          (p) => p.webserviceid !== part.webserviceid
        );
      } else {
        updatedList = [...prevList, part];
      }

      // Check goal immediately after updating the chosen list
      if (checkGoalAchievement(updatedList)) {
        setIsGoalAchieved(true);
      } else {
        setIsGoalAchieved(false);
      }

      return updatedList;
    });
  };

  const handleConfigure = async () => {
    // Append currently chosen parts to the cumulative currentSolution
    setCurrentSolution((prev) => [...prev, ...partsChosenList]);

    // If we reach here, it means goal wasn't achieved at part selection time
    const chosenOutputs = [
      ...new Set(partsChosenList.flatMap((item) => item.output_parameters)),
    ];

    const csrfToken = getCookie('csrftoken');
    const partsResponse = await fetch(
      'http://127.0.0.1:8002/api/parameters/filter/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          parameters: chosenOutputs,
        }),
      }
    );
    const partsData = await partsResponse.json();
    if (partsResponse.ok) {
      const newStage = stage + 1;
      setStage(newStage);
      const partsDataWithStage = partsData.map((part: any) => ({
        ...part,
        stage: newStage,
      }));
      setPartsFromParameters(partsDataWithStage);
      setPartsChosenList([]);
      setMaxAllowedToBeSelectedParts(chosenOutputs.length);
    } else {
      console.error('Error fetching next stage parts');
    }
  };

  const handleViewSolution = () => {
    router.push('/solution');
  };

  const isChosen = (part: Parts): boolean => {
    return partsChosenList.some(
      (chosen) => chosen.webserviceid === part.webserviceid
    );
  };

  // Filter partsList so that it doesn't include parts already in currentSolution or partsChosenList
  const filteredPartsList = partsList.filter(
    (part) =>
      !currentSolution.some((cs) => cs.webserviceid === part.webserviceid) &&
      !partsChosenList.some((ch) => ch.webserviceid === part.webserviceid)
  );

  return (
    <section className='w-2/5'>
      <div className='border-gray-300 bg-gray-50 border rounded-2xl p-10'>
        <div className='flex border-b-2 gap-x-2'>
          <h2 className='text-xl text-gray-600 font-semibold'>List of Parts</h2>
        </div>
        <div className='bg-white h-[51.5vh] mt-6 border-gray-200 border-2 rounded-md'>
          {filteredPartsList.map((part) => (
            <div
              className={`h-8 flex items-center cursor-pointer px-2 
                ${
                  isChosen(part)
                    ? 'bg-gray-300 text-gray-500 hover:bg-red-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-50 hover:font-medium hover:text-green-500'
                }`}
              key={part.webserviceid}
              onClick={() => handleTogglePart(part)}
            >
              {part.webservicename}
            </div>
          ))}
        </div>
        <div className='flex justify-end'>
          {isGoalAchieved ? (
            <button
              className='bg-sky-500 px-5 py-3 rounded-lg text-lg text-white mt-6 hover:bg-sky-400'
              onClick={handleViewSolution}
            >
              View Final Solution
            </button>
          ) : (
            <button
              className='bg-sky-500 px-5 py-3 rounded-lg text-lg text-white mt-6 hover:bg-sky-400 disabled:bg-gray-400'
              disabled={handleConfigDisable}
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
