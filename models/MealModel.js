import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  availableDay: {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    required: true,
  },
});

export default mongoose.model('Meal', MealSchema);
