export const calculateDiscount = (totalAmount) => {
  /**
   * Calculate discount based on total amount according to Asian-AB Polymer Industries Ltd discount structure
   */

  let discountPercentage = 22; // default

  if (totalAmount >= 250000) {
    discountPercentage = 25;
  } 
 
  else if (totalAmount >= 100000 && totalAmount < 250000) {
    discountPercentage = 24;
  } 
  else if (totalAmount >= 50000 && totalAmount < 100000) {
    discountPercentage = 23;
  } 
  else if (totalAmount >= 0 && totalAmount < 50000) {
    discountPercentage = 22;
  } 
  else {
    discountPercentage = 0;
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