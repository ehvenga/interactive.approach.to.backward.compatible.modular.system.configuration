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
export const resultAtom = atom([]);
