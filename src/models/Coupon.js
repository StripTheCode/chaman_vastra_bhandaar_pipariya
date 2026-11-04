export class CouponModel {
  static validate(data) {
    const errors = [];
    if (!data.code || !data.code.trim()) errors.push("Coupon code is required");
    if (!data.value || Number(data.value) <= 0) errors.push("Valid discount value is required");
    if (data.discountType && !["percentage", "fixed"].includes(data.discountType)) {
      errors.push("discountType must be either 'percentage' or 'fixed'");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static format(doc) {
    return {
      ...doc,
      code: doc.code.toUpperCase().trim(),
      discountType: doc.discountType || "percentage",
      value: Number(doc.value),
      minOrderValue: Number(doc.minOrderValue || 0),
      maxDiscount: doc.maxDiscount ? Number(doc.maxDiscount) : null,
      active: doc.active !== false,
    };
  }
}

export default CouponModel;

