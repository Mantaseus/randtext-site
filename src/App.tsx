import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState('1');
  const [format, setFormat] = useState('');

  return (<div className="flex flex-row justify-center p-4">
    <div className="md:w-[50rem] w-full">
      <div className="text-3xl font-bold py-4">randtext</div>
      <p>
        Some description I will write in later
      </p>

      <div className="w-full flex flex-row mt-4">
        <div className="w-80">test</div>
        <div className="flex-1 pl-4">
          <div>
            <label className="block text-gray-700 text-xs font-bold">Count</label>
            <input className="block rounded border p-1 mt-1" type="number" value={count} onChange={e => setCount(e.target.value)}/>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-xs font-bold">Text generation format</label>
            <input className="block rounded border w-full p-1 mt-1" type="text" value={format} onChange={e => setFormat(e.target.value)}/>
          </div>

          <button className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 px-4 py-1">
            Generate
          </button>
        </div>
      </div>
    </div>
  </div>);
}

export default App
