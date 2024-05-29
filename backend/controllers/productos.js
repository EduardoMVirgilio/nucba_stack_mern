import producto from "../models/producto.js";

export const browser = async (req, res) => {
  try {
    const { search, category, min, max } = req.query;
    let filters = {};

    if (search) {
      filters.name = { $regex: new RegExp(search, "i") };
    }

    if (min) {
      filters.price = { $gte: parseInt(min) };
    }

    if (max) {
      filters.price = { $lte: parseInt(max) };
    }

    if (category) {
      filters.category = category;
    }

    const data = await producto.find(filters);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const read = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await producto.findById(id);
    if (!data) {
      return res.status(400).send({ message: "Not found" });
    }
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const add = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const data = new producto({ name, price, category });
    await data.save();
    return res.status(202).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const edit = async (req, res) => {
  try {
    const updated = await producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(202).json(updated);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await producto.findByIdAndDelete(req.params.id);

    if (!removed) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(202).json({ message: "Product remove success" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
