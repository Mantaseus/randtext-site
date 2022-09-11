import { useState } from 'react'
import './App.css'
import * as randtext from './randtext';

function App() {
  const [count, setCount] = useState('1');
  const [format, setFormat] = useState('');

  const [generatedText, setGeneratedText] = useState<string[] | null>(null);
  const [generationError, setGenerationError] = useState<Error | null>(null);

  const generateRandomText = () => {
    setGenerationError(null);
    setGeneratedText(null);
    try {
      const countNum = Number(count);
      if (!countNum) {
        throw new Error(`Invalid count "${count}"`);
      }
      if (countNum <= 0) {
        throw new Error(`Invalid count "${count}". Must be > 0`);
      }

      setGeneratedText(Array(countNum).fill(0).map(() => randtext.generate(format)));
    } catch (e) {
      setGenerationError(e as Error);
    }
  }

  return (<div className="flex flex-row justify-center p-4">
    <div className="md:w-[50rem] w-full">
      <div className="text-3xl font-bold py-4">randtext</div>
      <p>
        Some description I will write in later
      </p>

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
          value={format}
          onChange={e => setFormat(e.target.value)}
          onKeyUp={e => e.key === 'Enter' && generateRandomText()}
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
