import storage from 'local-storage-fallback';
import React from 'react';

export const useStateWithLocalStorage = (
  localStorageKey: string,
  defaultVal?: any,
) => {
  const stringifyedData = storage.getItem(localStorageKey);
  const data = stringifyedData ? JSON.parse(stringifyedData) : null;

  const [value, setValue] = React.useState(data);

  React.useEffect(() => {
    storage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);

  return [value || defaultVal, setValue];
};
