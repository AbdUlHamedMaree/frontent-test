import create, { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const createStore = <T extends object>(
  initializer: StateCreator<T, [['zustand/immer', never]], []>,
) => create(immer(initializer));
