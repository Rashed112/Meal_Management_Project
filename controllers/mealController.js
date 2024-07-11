import Meal from '../models/MealModel.js';
import Item from '../models/ItemModel.js';

export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find().populate('items');
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createMeal = async (req, res) => {
  const { name, items, availableDay } = req.body;

  try {
    // Lookup item IDs based on item names
    const itemsData = await Item.find({ name: { $in: items } });

    if (itemsData.length !== items.length) {
      return res.status(400).json({ message: 'Some items not found' });
    }

    const itemIds = itemsData.map((item) => item._id);

    // Validate meal constraints
    if (itemIds.length < 3) {
      return res
        .status(400)
        .json({ message: 'A meal must have at least 3 items' });
    }

    const hasRice = itemsData.some((item) => item.category === 'starch');
    if (!hasRice) {
      return res.status(400).json({ message: 'A meal must have a rice item' });
    }

    const proteinCount = itemsData.filter(
      (item) => item.category === 'protein'
    ).length;
    if (proteinCount > 1) {
      return res
        .status(400)
        .json({ message: 'A meal cannot have two protein sources' });
    }

    // Check if a meal with the same name, items, and availableDay already exists
    const existingMeal = await Meal.findOne({
      name,
      items: { $all: itemIds, $size: itemIds.length },
      availableDay,
    });
    if (existingMeal) {
      return res
        .status(400)
        .json({
          message:
            'A meal with the same name, items, and available day already exists',
        });
    }

    const newMeal = new Meal({ name, items: itemIds, availableDay });
    await newMeal.save();
    res.json(newMeal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMeal = async (req, res) => {
  const { name, items, availableDay } = req.body;

  try {
    let meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    let itemIds = meal.items;

    if (items) {
      // Lookup item IDs based on item names
      const itemsData = await Item.find({ name: { $in: items } });

      if (itemsData.length !== items.length) {
        return res.status(400).json({ message: 'Some items not found' });
      }

      itemIds = itemsData.map((item) => item._id);

      // Validate meal constraints
      if (itemIds.length < 3) {
        return res
          .status(400)
          .json({ message: 'A meal must have at least 3 items' });
      }

      const hasRice = itemsData.some((item) => item.category === 'starch');
      if (!hasRice) {
        return res
          .status(400)
          .json({ message: 'A meal must have a rice item' });
      }

      const proteinCount = itemsData.filter(
        (item) => item.category === 'protein'
      ).length;
      if (proteinCount > 1) {
        return res
          .status(400)
          .json({ message: 'A meal cannot have two protein sources' });
      }

      meal.items = itemIds;
    }

    if (name) meal.name = name;
    if (availableDay) meal.availableDay = availableDay;

    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, meal, {
      new: true,
    });
    res.json(updatedMeal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};