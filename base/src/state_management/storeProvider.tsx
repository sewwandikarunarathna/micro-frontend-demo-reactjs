
import globalStore from './globalStore';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
interface StoreProviderProps {
  children?: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={globalStore}>{children}</Provider>;
}
