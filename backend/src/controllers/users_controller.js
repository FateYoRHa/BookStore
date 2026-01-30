import User from "../model/User.js";

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error finding users.", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUser(req, res) {
  try {
    const users = await User.findOne({ userId: req.params.id });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error finding users.", error);
    res.status(404).json({ message: "user not found." });
  }
}
export async function addUser(req, res) {
  try {
    const { username, password, address } = req.body;

    const newUser = new User({
      username,
      password,
      address,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error adding user.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
export async function updateUser(req, res) {
  try {
    const { username, password, address } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: req.params.id },
      {
        username,
        password,
        address,
      },
      { new: true },
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log("Error updating user.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function deleteUser(req, res) {
  try {
    await User.findOneAndDelete({userId: req.params.id});
    res.status(204).json({ message: "User was deleted successfully" });
  } catch (error) {
    console.log("Error deleting user.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
