export function compareWords(word1, word2) {
  const upperWord1 = word1.toUpperCase();
  const upperWord2 = word2.toUpperCase();

  const charCount1 = {};
  const charCount2 = {};

  for (const char of upperWord1) {
    charCount1[char] = (charCount1[char] || 0) + 1;
  }

  for (const char of upperWord2) {
    charCount2[char] = (charCount2[char] || 0) + 1;
  }

  let commonCount = 0;
  for (const char in charCount1) {
    if (char in charCount2) {
      commonCount += Math.min(charCount1[char], charCount2[char]);
    }
  }

  return commonCount;
}