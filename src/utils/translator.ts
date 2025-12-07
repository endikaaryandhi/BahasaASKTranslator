export const translateWord = (word: string): string => {
  const vowelRegex = /[aeiou]/gi;
  const matches = [...word.matchAll(vowelRegex)];

  if (matches.length === 0) return word;

  const lastVowel = matches[matches.length - 1];
  const index = lastVowel.index;
  
  if (index === undefined) return word;

  const prefix = word.slice(0, index);
  const suffix = word.slice(index);

  return `${prefix}ASK${suffix}`;
};

export const translateSentence = (text: string): string => {
  if (!text) return "";
  return text.replace(/[a-zA-Z]+/g, (word) => translateWord(word));
};

export const decodeWord = (word: string): string => {
  return word.replace(/ask(?=[aeiou])/gi, ""); 
};

export const decodeSentence = (text: string): string => {
  if (!text) return "";
  return text.replace(/[a-zA-Z]+/g, (word) => decodeWord(word));
};