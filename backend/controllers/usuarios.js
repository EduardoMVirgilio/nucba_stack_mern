import usuario from "../models/usuario.js";

export const browser = async (req, res) => {
  try {
    const data = await usuario.find();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
