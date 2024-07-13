import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ email, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  const { email, role, isBanned } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email) user.email = email;
    if (role) user.role = role;
    if (isBanned !== undefined) user.isBanned = isBanned;

    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isBanned: user.isBanned,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();

    res.json({ message: 'User removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
