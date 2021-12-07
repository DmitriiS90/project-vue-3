const jwt = require("jsonwebtoken");

class AuthToken {
  static accessToken = null;
  static refreshToken = null;

  static get accessToken() {
    return this.accessToken;
  }

  static get refreshToken() {
    return this.refreshToken;
  }

  static get tokens() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }

  static generateToken(payload, secretKey, options) {
    return jwt.sign(payload, secretKey, options);
  }
}

export default AuthToken;
