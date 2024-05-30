import usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
export const browser = async (req, res) => {
  try {
    const data = await usuario.find();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const read = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await usuario.findById(id);
    if (!data) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const validate = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ message: "Incomplete Data" });
    }

    const user = await usuario.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    let validate = await bcryptjs.compare(password, user.password);
    if (!validate) {
      return res.status(500).send({ message: "Credentials not match" });
    }

    if (!user.isActive) {
      return res.status(500).send({ message: "User is disabled" });
    }

    return res.status(202).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const add = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ message: "Incomplete Data" });
    }
    const newUser = new usuario({ username, password });
    await newUser.save();
    return res.status(202).send(newUser);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const edit = async (req, res) => {
  try {
    const updated = await usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(202).json(updated);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
