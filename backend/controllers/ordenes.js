import orden from "../models/orden.js";
import producto from "../models/producto.js";

export const browser = async (req, res) => {
  try {
    const { username, method } = req.query;
    let filters = {};
    if (username) {
      filters.username = { $regex: new RegExp(username, "i") };
    }
    if (method) {
      filters.method = method;
    }
    const methods = await orden.distinct("method");
    const data = await orden.find(filters).populate("items.id");
    return res.status(200).send({ data, methods });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const read = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await orden.findById(id).populate("items.id");
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const add = async (req, res) => {
  try {
    const { username, items, amount, method } = req.body;

    if (!username || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    for (let item of items) {
      const { id, quantity, price } = item;
      if (!id || !quantity || !price || quantity <= 0 || price <= 0) {
        return res.status(400).json({ message: "Invalid product data" });
      }
      const exist = await producto.findById(id);
      if (!exist) {
        return res
          .status(404)
          .json({ message: `Product with id ${product} not found` });
      }

      await producto.findByIdAndUpdate(id, {
        stock: exist.stock - quantity,
      });
    }

    const newOrder = new Order({
      username,
      items,
      amount,
      method,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await orden.findByIdAndDelete(req.params.id);

    if (!removed) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(202).json({ message: "Order remove success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
