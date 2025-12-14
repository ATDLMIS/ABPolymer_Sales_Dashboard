function formatAmountWithCommas(amount) {
  const num = Number(amount);
  if (isNaN(num)) return 'Invalid amount';
  return num
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default formatAmountWithCommas;