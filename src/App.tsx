import { useEffect, useState } from 'react'
import { Code } from './Code';
import { OperationsReferenceDocs } from './OperationsReferenceDocs';
import * as randtext from './randtext';

function useTerminalLikeHistory(size: number = 50) {
  const [history, setHistory] = useState<string[]>(() => JSON.parse(localStorage.getItem('history') || '[]'));
  useEffect(() => localStorage.setItem('history', JSON.stringify(history)), [history])
  return {
    value: history,
    append: (item: string) => setHistory(prev => prev[0] !== item ? [item, ...prev].slice(0, size) : prev),
  }
}

function App() {
  const history = useTerminalLikeHistory();
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [count, setCount] = useState('1');
  const [format, setFormat] = useState('');
  const [generatedText, setGeneratedText] = useState<string[] | null>(null);
  const [generationError, setGenerationError] = useState<Error | null>(null);

  const currentFormat = historyIndex >= 0 ? history.value[historyIndex] : format;

  const generateRandomText = () => {
    if (!currentFormat) {
      return;
    }

    setGenerationError(null);
    setGeneratedText(null);
    setHistoryIndex(-1);
    setFormat('');
    history.append(currentFormat);
    try {
      const countNum = Number(count);
      if (!countNum) {
        throw new Error(`Invalid count "${count}"`);
      }
      if (countNum <= 0) {
        throw new Error(`Invalid count "${count}". Must be > 0`);
      }

      setGeneratedText(Array(countNum).fill(0).map(() => randtext.generate(currentFormat)));
    } catch (e) {
      setGenerationError(e as Error);
    }
  }

  return (<div className="flex flex-row justify-center p-4">
    <div className="md:w-[50rem] w-full">
      <div className="text-3xl font-bold py-4">randtext</div>
      <p>
        A simple little tool to generate randomized text. It allows for generating
      </p>
      <ul className="list-disc ml-5">
        <li>Meaningless mishmash of characters</li>
        <li>Pronouncable mishmash of characters</li>
        <li>Random dictionary words</li>
      </ul>
      <p className="mt-5">
        It allows for combining multiple generation patterns together as needed.
      </p>

      <p className="mt-5">
        Commands can be executed using the <Code>Enter</Code> key. Move back through
        your history of commands using the <Code>Up</Code> and <Code>Down</Code> keys.
      </p>

      <OperationsReferenceDocs/>

      <div className="mt-8">
        <label className="block text-gray-700 text-sm font-bold">Count</label>
        <input className="block rounded border p-1 mt-1" type="number"
          value={count}
          onChange={e => setCount(e.target.value)}
          onKeyUp={e => e.key === 'Enter' && generateRandomText()}
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold">Text generation format</label>
        <input className="block rounded border w-full p-1 mt-1" type="text"
          value={currentFormat}
          onChange={e => {
            setHistoryIndex(-1);
            setFormat(e.target.value);
          }}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              generateRandomText();
            } else if (e.key === 'ArrowUp') {
              setHistoryIndex(prev => Math.max(Math.min(prev + 1, history.value.length - 1), -1));
            } else if (e.key === 'ArrowDown') {
              setHistoryIndex(prev => Math.max(Math.min(prev - 1, history.value.length - 1), -1));
            }
          }}
        />
      </div>

      <button className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 px-4 py-1" onClick={generateRandomText}>
        Generate
      </button>

      {generatedText && <>
        <div className="mt-8 text-sm text-gray-700 font-bold">Generated text</div>
        <pre className='rounded bg-gray-100 border border-gray-400 px-4 py-2 mt-1'>
          {generatedText.join('\n')}
        </pre>
      </>}

      {generationError && <div className='mt-8'>
        <div className="bg-red-500 text-white font-bold px-4 py-2 rounded-t">Failed to generate random text</div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">{String(generationError)}</div>
      </div>}
    </div>
  </div>);
}

export default App
