import React from 'react';
import { useAppContext } from '../context/AppContext';
import { t } from './translations';

export const T = ({ children }: { children: string }) => {
  const { profile } = useAppContext();
  return <>{t(children, profile.language)}</>;
};
