import type React from 'react';
import { Code } from './Code';

export interface Props {
  onTryCommand?: (command: string) => void;
}

export const commands: { command: string, description: React.ReactNode }[] = [
  {
    command: '-6pcC, abc ,-6i, ,-4-abcxyz!@#$%^&*()[]{}',
    description: <div>
      This will generate
      <ul className="list-disc ml-5">
        <li>A pronouncable "word" with 6 characters with random casing, then</li>
        <li>Literally <Code>" abc "</Code>, then</li>
        <li>6 digits, then</li>
        <li>Literally <Code>" "</Code> (a space character), then</li>
        <li>4 characters randomly picked from <Code>{'abcxyz!@#$%^&*()[]{}'}</Code></li>
      </ul>
    </div>,
  },
]

export const Examples: React.FC<Props> = ({ onTryCommand }) => {
  return <details className="mt-5">
    <summary className="font-bold cursor-pointer">Examples</summary>
    <div className="ml-5">
      <ul className="list-disc ml-5">
        {commands.map(({ command, description }) => <li>
          <div className="flex items-stretch gap-2">
            <code className="border border-gray-400 rounded py-1 px-4 bg-gray-200">{command}</code>
            <button className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold px-4" onClick={() => onTryCommand?.(command)}>
              Try it
            </button>
          </div>
          {description}
        </li>)}
      </ul>
    </div>
  </details>;
};
