import type React from 'react';

export const OperationsReferenceDocs: React.FC = () => {
  return <details className="mt-5">
    <summary className="font-bold cursor-pointer">Operations reference docs</summary>
    <div className="ml-5">
      <p className="mt-5 mb-4">
        The following patterns can be used
      </p>
      <ul className="list-disc ml-5">
        <li>
          <span className="font-bold">Combinable operations</span> - The following can be
          combined together into a single randomized text generation command
          <ul className="list-disc ml-7">
            <li><code className="border rounded bg-gray-300 px-1">{'{count}'}c</code> - All lowercase ascii alphabets</li>
            <li><code className="border rounded bg-gray-300 px-1">{'{count}'}C</code> - All uppercase ascii alphabets</li>
            <li><code className="border rounded bg-gray-300 px-1">{'{count}'}i</code> - All integers from 0-9</li>
            <li>
              Arbitrary special characters - Any special character can be used based on your
              need. The <code className="border rounded bg-gray-300 px-1">,</code>
              character will need to be escaped like this 
              <code className="border rounded bg-gray-300 px-1">\,</code>
              because it is used to delimit multiple operations together . You can even use a
              space if you want.
            </li>
          </ul>
        </li>
        <li>
          <span className="font-bold">Non-combinable operations</span> - The following need to be
          run in separate randomized text generation commands.
          <ul className="list-disc ml-7">
            <li><code className="border rounded bg-gray-300 px-1">{'{wordSize}'}pc</code> - Generate lowercase pronouncable text</li>
            <li><code className="border rounded bg-gray-300 px-1">{'{wordSize}'}pC</code> - Generate uppercase pronouncable text</li>
            <li><code className="border rounded bg-gray-300 px-1">{'{wordSize}'}pcC</code> - Generate pronouncable text with each character having a random case</li>
            <li><code className="border rounded bg-gray-300 px-1">{'{wordSize}'}dc</code> - Generate lowercase dictionary text</li>
            <li><code className="border rounded bg-gray-300 px-1">{'{wordSize}'}dC</code> - Generate uppercase dictionary text</li>
            <li><code className="border rounded bg-gray-300 px-1">{'{wordSize}'}dcC</code> - Generate dictionary text with each character having a random case</li>
          </ul>
        </li>
      </ul>
    </div>
  </details>;
};
