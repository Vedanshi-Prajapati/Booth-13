import { useContext } from 'react';
import { SecretsContext } from './context';

export function useSecrets() {
  const context = useContext(SecretsContext);
  if (!context) {
    throw new Error('useSecrets must be used within SecretsProvider');
  }
  return context;
}

export default useSecrets;
