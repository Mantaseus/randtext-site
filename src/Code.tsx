import type React from 'react';

export interface Props {

}

export const Code: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return <code className="border rounded bg-gray-300 px-1">{children}</code>;
};
