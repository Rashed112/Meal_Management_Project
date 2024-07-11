import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['protein', 'starch', 'veg', 'other'],
    required: true,
  },
});

export default mongoose.model('Item', ItemSchema);