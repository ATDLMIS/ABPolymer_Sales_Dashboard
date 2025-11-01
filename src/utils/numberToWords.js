function numberToWords(num) {
  if (num === 0) return 'zero';

  const belowTwenty = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];
  const thousands = ['', 'thousand', 'million', 'billion'];

  function helper(n) {
    if (n === 0) return '';
    if (n < 20) return belowTwenty[n] + ' ';
    if (n < 100) return tens[Math.floor(n / 10)] + ' ' + helper(n % 10);
    if (n < 1000)
      return belowTwenty[Math.floor(n / 100)] + ' hundred ' + helper(n % 100);
    return '';
  }

  let word = '';
  let i = 0;

  while (num > 0) {
    if (num % 1000 !== 0) {
      word = helper(num % 1000) + thousands[i] + ' ' + word;
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return word.trim();
}

export default numberToWords;
