import mongoose, { connect } from "mongoose";
import { config } from "dotenv";
config({ path: "../../db/.env" });
const mongoURI = `mongodb://root:mern01@localhost:27017/`;

const connected = async (req, res, next) => {
  try {
    await connect(mongoURI);
    const db = mongoose.connection;
    db.on("open", () => console.log("Base de datos Lista!"));
    db.on("close", () => console.log("Base de datos cerrada!"));
    next();
  } catch (error) {
    res.status(500).send("Error al conectar con la base de datos");
  }
};

export default connected;
