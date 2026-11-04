export class CategoryModel {
  static validate(data) {
    const errors = [];
    if (!data.name || !data.name.trim()) errors.push("Category name is required");
    if (!data.slug || !data.slug.trim()) errors.push("Category slug is required");

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static format(doc) {
    return {
      ...doc,
      slug: doc.slug.toLowerCase().trim().replace(/\s+/g, "-"),
      image: doc.image || "/images/banner-editorial.jpg",
      subcategories: Array.isArray(doc.subcategories) ? doc.subcategories : [],
    };
  }
}

export default CategoryModel;

