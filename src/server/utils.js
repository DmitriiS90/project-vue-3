const jwt = require("jsonwebtoken");
export const secretKey = "secretKey";

export const generateToken = (expiresIn, secretKey, payload) => {
  return jwt.sign(payload, secretKey, {
    expiresIn,
  });
};

export const getTokenByUserId = (schema, userId) => {
  return schema.findBy({
    userId,
  });
};

export const saveToken = (schema, data) => {
  schema.insert(data);
};

export const removeTokenByUserId = (schema, userId) => {
  schema.remove({ userId });
};

export const checkExpiresInRefreshToken = (schema, user) => {
  const refreshTokenByUserId = getTokenByUserId(
    schema.db.refreshToken,
    user.id
  );

  const tokens = getTokens({
    accessTokenPayload: {
      payload: { login: user.login },
      secretKey,
      expiresIn: "1h",
    },
    refreshTokenPayload: {
      payload: { login: user.login },
      secretKey,
      expiresIn: "30d",
    },
  });

  saveToken(schema.db.accessToken, {
    userId: +user.id,
    exp: "1h",
  });

  saveToken(schema.db.refreshToken, {
    userId: +user.id,
    exp: "30d",
  });

  if (Date.now() < refreshTokenByUserId.exp) {
    removeTokenByUserId(schema.db.accessToken, user.id);
    removeTokenByUserId(schema.db.refreshToken, user.id);
  }

  return tokens;
};

export const checkExpiresInAccessToken = (schema, user) => {
  const accessTokenByUserId = getTokenByUserId(schema.db.accessToken, user.id);
  if (Date.now() > accessTokenByUserId.exp) {
    return false;
  }

  return true;
};

export const getTokens = (data) => {
  const { accessTokenData, refreshTokenData } = data;
  const accessToken = generateToken(
    accessTokenData.expiresIn,
    accessTokenData.secretKey,
    accessTokenData.payload
  );

  const refreshToken = generateToken(
    refreshTokenData.expiresIn,
    refreshTokenData.secretKey,
    refreshTokenData.payload
  );

  return {
    accessToken,
    refreshToken,
  };
};
