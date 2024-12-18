import { atom, useAtom } from 'jotai';

interface Parameter {
  id: number;
  label: string;
  name: string;
}

interface Parts {
  id: number;
  label: string;
  name: string;
}

export const stageAtom = atom(0);
export const toBeSelectedInitialParamListAtom = atom<Parameter[]>([]);
export const selectedInitialParameterListAtom = atom<Parameter[]>([]);
export const toBeSelectedGoalParamListAtom = atom<Parameter[]>([]);
export const selectedGoalParameterListAtom = atom<Parameter[]>([]);
export const partsListAtom = atom<Parts[]>([]);
export const partsChosenListAtom = atom<Parts[]>([]);
export const viewSolutionAtom = atom<boolean>(false);
export const optimalResultAtom = atom([]);
export const partsFromParametersAtom = atom([]);
export const currentSolutionAtom = atom([]);
export const maxAllowedToBeSelectedPartsAtom = atom(50);
export const initialIDAtom = atom([]);
export const goalIDAtom = atom([]);
export const isGoalAchievedAtom = atom<boolean>(false);
export const backwardCompatibilityAtom = atom<boolean>(false);
