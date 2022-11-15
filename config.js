const PERSISTENCE_TYPE = {
  TYPE_MONGODB: 'MONGODB',
};

const config = {
  PORT: process.env.PORT || 8080,
  PERSISTENCE_TYPE: PERSISTENCE_TYPE.TYPE_MONGODB,
  MONGODB_CONNECTION_STR: 'mongodb+srv://admin:admin@e-commerce.wv4szyy.mongodb.net/ecommerce?retryWrites=true&w=majority',
  MONGODB_TIMEOUT: 2000,
};

export {PERSISTENCE_TYPE, config as default};