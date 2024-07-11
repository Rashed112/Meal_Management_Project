import mongoose from'mongoose';

const MealScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
  },
});

export default mongoose.model('MealSchedule', MealScheduleSchema);
