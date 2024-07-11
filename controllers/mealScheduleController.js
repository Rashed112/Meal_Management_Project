import MealSchedule from '../models/MealScheduleModel.js';
import Meal from '../models/MealModel.js';

export const getMealSchedules = async (req, res) => {
  try {
    let mealSchedules;
    if (req.user.role === 'admin') {
      mealSchedules = await MealSchedule.find().populate('user meal');
    } else {
      mealSchedules = await MealSchedule.find({ user: req.user.id }).populate(
        'meal'
      );
    }
    res.json(mealSchedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createMealSchedule = async (req, res) => {
  const { date, mealId } = req.body;

  try {
    const existingSchedule = await MealSchedule.findOne({
      user: req.user.id,
      date,
    });
    if (existingSchedule) {
      return res
        .status(400)
        .json({ message: 'Meal already scheduled for this date' });
    }

    if (mealId) {
      const meal = await Meal.findById(mealId);
      if (!meal) {
        return res.status(404).json({ message: 'Meal not found' });
      }

      // Check if the meal is available for the selected day
      const selectedDay = new Date(date).toLocaleString('en-us', {
        weekday: 'long',
      });
      if (meal.availableDay !== selectedDay) {
        return res
          .status(400)
          .json({ message: 'This meal is not available on the selected day' });
      }
    }

    const newMealSchedule = new MealSchedule({
      user: req.user.id,
      date,
      meal: mealId || null, // Allow "No Meal" option
    });

    await newMealSchedule.save();
    res.json(newMealSchedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMealSchedule = async (req, res) => {
  const { mealId } = req.body;

  try {
    let mealSchedule = await MealSchedule.findById(req.params.id);
    if (!mealSchedule) {
      return res.status(404).json({ message: 'Meal schedule not found' });
    }

    // Check if the user is trying to modify a past meal
    if (new Date(mealSchedule.date) < new Date()) {
      return res
        .status(400)
        .json({ message: 'Cannot modify meals for past dates' });
    }

    if (mealId) {
      const meal = await Meal.findById(mealId);
      if (!meal) {
        return res.status(404).json({ message: 'Meal not found' });
      }

      // Check if the meal is available for the selected day
      const selectedDay = new Date(mealSchedule.date).toLocaleString('en-us', {
        weekday: 'long',
      });
      if (meal.availableDay !== selectedDay) {
        return res
          .status(400)
          .json({ message: 'This meal is not available on the selected day' });
      }
    }

    mealSchedule.meal = mealId || null; // Allow "No Meal" option
    await mealSchedule.save();

    res.json(mealSchedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMealSchedule = async (req, res) => {
  try {
    const mealSchedule = await MealSchedule.findById(req.params.id);
    if (!mealSchedule) {
      return res.status(404).json({ message: 'Meal schedule not found' });
    }

    // Check if the user is trying to delete a past meal schedule
    if (new Date(mealSchedule.date) < new Date()) {
      return res
        .status(400)
        .json({ message: 'Cannot delete meal schedules for past dates' });
    }

    await mealSchedule.remove();
    res.json({ message: 'Meal schedule removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
