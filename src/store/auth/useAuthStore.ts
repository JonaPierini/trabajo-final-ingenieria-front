import {create} from 'zustand';

// define types for state values and actions separately
type State = {
  status: string;
};

type Action = {
  loggin: () => void;
  logout: () => void;
};

// define the initial state
const initialState: State = {
  status: 'unAuthorized',
};

// create store
export const useAuthStore = create<State & Action>()(set => ({
  ...initialState,
  loggin: () => {
    set({status: 'authorized'});
  },
  logout: () => {
    set(initialState);
  },
}));
