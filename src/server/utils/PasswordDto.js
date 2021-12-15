const bcrypt = require("bcryptjs");

class PasswordDto {
  static async hash(rounds = 10, password) {
    const salt = await bcrypt.genSalt(rounds);

    return await bcrypt.hash(password, salt);
  }

  static compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default PasswordDto;
