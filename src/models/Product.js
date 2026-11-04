export class ProductModel {
  static validate(data) {
    const errors = [];
    if (!data.title || !data.title.trim()) errors.push("Product title is required");
    if (!data.category || !data.category.trim()) errors.push("Category is required");
    if (data.priceINR === undefined || Number(data.priceINR) <= 0) errors.push("Valid price in INR is required");

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static format(doc) {
    const priceINR = Number(doc.priceINR || 0);
    const originalPriceINR = Number(doc.originalPriceINR || priceINR);
    const discountPercent =
      originalPriceINR > priceINR
        ? Math.round(((originalPriceINR - priceINR) / originalPriceINR) * 100)
        : 0;

    return {
      ...doc,
      priceINR,
      originalPriceINR,
      discountPercent,
      discount: discountPercent > 0 ? `${discountPercent}% OFF` : "",
      inStock: doc.inStock !== undefined ? Number(doc.inStock) : 15,
      sizes: Array.isArray(doc.sizes) ? doc.sizes : ["Free Size"],
      images: Array.isArray(doc.images) && doc.images.length > 0 ? doc.images : [doc.image || "/images/saree-champagne.jpg"],
    };
  }
}

export default ProductModel;

