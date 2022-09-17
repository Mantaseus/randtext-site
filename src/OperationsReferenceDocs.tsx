import type React from 'react';
import { Code } from './Code';

export const OperationsReferenceDocs: React.FC = () => {
  return <details className="mt-5">
    <summary className="font-bold cursor-pointer">Operations reference docs</summary>
    <div className="ml-5">
      <p className="mt-5 mb-4">
        An operation is a part of the text generation command that defines things like the
        type of text generation algorithm to use, the size of the generated string, the
        characters used in the generation process, etc. Multiple operations can be defined
        in a single text generation command delimited using a <Code>,</Code>
      </p>
      <p className="mt-5 mb-4">
        The following types of operations can be used
      </p>

      <ul className="list-disc ml-5">
        <li>
          <span className="font-bold">Combinable operations</span> - The following can be
          combined together into a single randomized text generation command
          <ul className="list-disc ml-7">
            <li><Code>{'{count}'}c</Code> - All lowercase ascii alphabets</li>
            <li><Code>{'{count}'}C</Code> - All uppercase ascii alphabets</li>
            <li><Code>{'{count}'}i</Code> - All integers from 0-9</li>
            <li>
              Arbitrary special characters - Any special character can be used based on your
              need. The <Code>,</Code> character will need to be escaped like this 
              <Code>\,</Code> because it is used to delimit multiple operations together. You
              can even use a space if you want.
            </li>
          </ul>
        </li>
        <li>
          <span className="font-bold">Non-combinable operations</span> - The following need to be
          run in separate randomized text generation commands.
          <ul className="list-disc ml-7">
            <li><Code>{'{wordSize}'}pc</Code> - Generate lowercase pronouncable text</li>
            <li><Code>{'{wordSize}'}pC</Code> - Generate uppercase pronouncable text</li>
            <li><Code>{'{wordSize}'}pcC</Code> - Generate pronouncable text with each character having a random case</li>
            <li><Code>{'{wordSize}'}dc</Code> - Generate lowercase dictionary text</li>
            <li><Code>{'{wordSize}'}dC</Code> - Generate uppercase dictionary text</li>
            <li><Code>{'{wordSize}'}dcC</Code> - Generate dictionary text with each character having a random case</li>
          </ul>
        </li>
      </ul>
    </div>
  </details>;
};
