const mongoose = require("mongoose");

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

const MONGOOSE_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

mongoose
  .connect(MONGOOSE_URI, {})
  .then((db) => console.log("La base de datos esta conectada"))
  .catch((err) => console.log("la base de datos no esta conectada"));
