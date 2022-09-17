import * as dotenv from "dotenv";
import app from "./app";

dotenv.config();

const { PORT = 5000 } = process.env;

const server = app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}...`)
);

export default server;
