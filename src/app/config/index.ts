require("dotenv").config({ path: [process.cwd(), ".env"] });

export default { port: process.env.PORT, DB: process.env.DB };
export const configFiles = {
  port: process.env.PORT,
  url: process.env.MONGODB_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET,
  cloudinary: {
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_api: process.env.CLOUDINARY_KEY,
    cloudinary_secret: process.env.CLOUDINARY_SECRET,
  },
};
