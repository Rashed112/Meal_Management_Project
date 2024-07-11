import Item from '../models/ItemModel.js';

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createItem = async (req, res) => {
  const { name, category } = req.body;

  try {
    // Check if an item with the same name already exists
    const existingItem = await Item.findOne({ name });

    if (existingItem) {
      return res
        .status(400)
        .json({ message: 'Item with the same name already exists' });
    }

    const newItem = new Item({ name, category });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
