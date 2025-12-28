export const calculateDiscount = (totalAmount) => {
  /**
   * Calculate discount based on total amount according to Asian-AB Polymer Industries Ltd discount structure
   */

  let discountPercentage = 26; // default

  if (totalAmount > 0) {
    discountPercentage = 26;
  }

  const discountAmount = (totalAmount * discountPercentage) / 100;
  const finalAmount = totalAmount - discountAmount;

  return {
    discountPercentage,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalAmount: Math.round(finalAmount * 100) / 100,
    originalAmount: totalAmount,
  };
};