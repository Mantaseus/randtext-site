import { dictionaryWordsByLength } from "./dict";

const PIECE_DELIMITER = ',';
const CMD_DELIMITER = '-';
const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Characters for pronouncability. Adapted from http://www.blackwasp.co.uk/PronounceablePasswords.aspx
const VOWELS = 'a,ai,au,e,ea,ee,i,ia,io,o,oa,oi,oo,ou,u'.split(',')
const CONSONANTS = 'b,c,ch,cl,d,f,ff,g,gh,gl,j,k,l,ll,m,mn,n,p,ph,ps,r,rh,s,sc,sh,sk,st,t,th,v,w,x,y,z'.split(',')

export function randomPick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

export function randomCase(text: string) {
  return text.split('').map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join('');
}

export function randomAlphabet() {
  return randomPick(ALPHABETS);
}

export function randomInt(min = 0, max = 9) {
  return Math.round(Math.random() * (max - min)) + min;
}

export function randomPronouncable(length: number) {
  let generatedStr = '';

  let pickVowel = Math.random() > 0.5;
  while (generatedStr.length < length) {
    const strToAppend = pickVowel ? randomPick(VOWELS) : randomPick(CONSONANTS);
    const newGeneratedStr = `${generatedStr}${strToAppend}`;
    if (newGeneratedStr.length <= length) {
      generatedStr = newGeneratedStr;
      pickVowel = !pickVowel;
    }
  }

  return generatedStr;
}

export function randomDictionary(length: number) {
  return randomPick(dictionaryWordsByLength[length] || [])
}

export const pronouncableGenerators: Record<string, (length: number) => string> = {
  pc: length => randomPronouncable(length).toLowerCase(),
  pC: length => randomPronouncable(length).toUpperCase(),
  pcC: length => randomCase(randomPronouncable(length)),
}

export const dictionaryGenerators: Record<string, (length: number) => string> = {
  dc: length => randomDictionary(length).toLowerCase(),
  dC: length => randomDictionary(length).toUpperCase(),
  dcC: length => randomCase(randomDictionary(length)),
}

export const combinableGenerators: Record<string, () => string> = {
  c: () => randomAlphabet().toLowerCase(),
  C: () => randomAlphabet().toUpperCase(),
  cC: () => randomCase(randomAlphabet()),
  i: () => String(randomInt()),
}

export function generate(command: string) {
  return command.split(RegExp(`(?<!\\\\)${PIECE_DELIMITER}`))
    .map(piece => piece.replace(RegExp(`\\\\${PIECE_DELIMITER}`), PIECE_DELIMITER))
    .map(piece => {
      if (piece.startsWith(CMD_DELIMITER)) {
        const [_ignore, rawCmdStr, ...rest] = piece.split(CMD_DELIMITER);
        const fullCmd = rawCmdStr || '1';
        const additionalChars = rest.join(CMD_DELIMITER);
        
        const { countStr = '1', cmd = '' } = fullCmd.match(/(?<countStr>\d*)(?<cmd>.*)/)?.groups || {};
        const count = Number(countStr) || 1;

        if (pronouncableGenerators[cmd]) {
          return pronouncableGenerators[cmd](count);
        }
        if (dictionaryGenerators[cmd]) {
          return dictionaryGenerators[cmd](count);
        }

        const choices = [
          ...Object.entries(combinableGenerators)
            .filter(([commandName]) => cmd.includes(commandName))
            .map(command => command[1]),
          ...(additionalChars ? [() => randomPick(additionalChars.split(''))] : [])
        ];
        return Array(count).fill(0).map(() => randomPick(choices)()).join('');
      } else {
        return piece;
      }
    })
    .join('');
}
