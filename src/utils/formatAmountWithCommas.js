function formatAmountWithCommas(amount) {
  if (isNaN(amount)) return 'Invalid amount';
  return amount
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default formatAmountWithCommas;
