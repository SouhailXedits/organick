export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  pablic_key: process.env.PUBLIC_KEY,
  secret_key: process.env.SECRET_KEY,
  accessTokenExp: process.env.ACCESSTOKEN_EXP,
  refreshTokenExp: process.env.REFRESHTOKEN_EXP,
});
