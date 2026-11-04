import bcrypt from "bcryptjs";

export const UserRoles = {
  CUSTOMER: "customer",
  ADMIN: "admin",
};

export class UserModel {
  /**
   * Hash a raw password using bcrypt
   */
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Verify password against hash
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Sanitize user object for client response (strips password hash)
   */
  static sanitize(user) {
    if (!user) return null;
    const { passwordHash, ...clean } = user;
    return clean;
  }

  /**
   * Build initial new user structure
   */
  static createInitial({ name, email, phone, passwordHash, role = UserRoles.CUSTOMER }) {
    return {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : "",
      passwordHash,
      role,
      loyaltyPoints: 100, // 🎁 Welcome Bonus: 100 Chaman Coins!
      pointsHistory: [
        {
          id: `pts_welcome_${Date.now()}`,
          type: "CREDIT",
          amount: 100,
          reason: "Welcome to Chaman Heritage Club",
          timestamp: new Date().toISOString(),
        },
      ],
      addresses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export default UserModel;

