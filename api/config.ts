import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      secretId: process.env.GOOGLE_SECRET_ID,
    },
    db: 'mongodb://localhost/spotify'
};

export default config;