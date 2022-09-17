import type React from 'react';
import { Code } from './Code';

export interface Props {
  onTryCommand?: (command: string) => void;
}

export const commands: { command: string, description: React.ReactNode }[] = [
  {
    command: '-4-\\,',
    description: <ul className="list-disc ml-5 mb-5">
      <li>Will just show 4 <Code>,</Code> characters</li>
    </ul>
  },
  {
    command: '-4-abcxyz',
    description: <ul className="list-disc ml-5 mb-5">
      <li>4 characters randomly picked from <Code>abcxyz</Code></li>
    </ul>
  },
  {
    command: '-6c-!@#$',
    description: <ul className="list-disc ml-5 mb-5">
      <li>6 characters randomly picked from <Code>!@#$</Code> and any lowercase ascii alphabets</li>
    </ul>
  },
  {
    command: '-6pcC,\\,,-6dC',
    description: <ul className="list-disc ml-5 mb-5">
      <li>A pronouncable word with 6 characters, and</li>
      <li>Literally <Code>,</Code> character, and</li>
      <li>A dictionary word with 6 characters</li>
    </ul>
  },
  {
    command: '-6icC, abc ,-6i, ,-4-!@#$%^&*()[]{}',
    description: <ul className="list-disc ml-5">
      <li>A pronouncable "word" with 6 characters with random casing, and</li>
      <li>Literally <Code>" abc "</Code>, and</li>
      <li>6 digits, and</li>
      <li>Literally <Code>" "</Code> (a space character), and</li>
      <li>4 characters randomly picked from <Code>{'abcxyz!@#$%^&*()[]{}'}</Code></li>
    </ul>,
  },
]

export const Examples: React.FC<Props> = ({ onTryCommand }) => {
  return <details className="mt-5">
    <summary className="font-bold cursor-pointer">Examples</summary>
    <div className="ml-5">
      <ul className="list-disc ml-5">
        {commands.map(({ command, description }) => <li>
          <div className="flex items-stretch gap-2">
            <code className="border border-gray-400 rounded px-4 bg-gray-200">{command}</code>
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
