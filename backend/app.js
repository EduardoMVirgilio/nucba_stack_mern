import express from "express";
import cors from "cors";
import db from "./middlewares/conection.js";
import productos from "./routes/productos.js";
import usuarios from "./routes/usuarios.js";
import ordenes from "./routes/ordenes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(db);

app.get("/", (req, res) => res.send("Hola Mundo"));

app.use("/productos", productos);
app.use("/ordenes", ordenes);
app.use("/usuarios", usuarios);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));
