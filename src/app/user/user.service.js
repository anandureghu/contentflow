const User = require("../../models/user.model");

class UserService {
  async getAllUsers() {
    try {
      const users = await User.find({}, { password: 0 });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, updatedData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
