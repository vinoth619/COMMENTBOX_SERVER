const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv =require('dotenv')

dotenv.config()
const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());


const MONGODB ="mongodb+srv://xbi4gpt:irc26977@cluster0.dacxa.mongodb.net/COMMENTS_NODEJS?retryWrites=true&w=majority";


mongoose.connect(MONGODB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const commandSchema = new mongoose.Schema({
  content: { type: String, required: true },
  replies: [
    {
      firstreplies: { type: String },
    },
  ],
});

const Command = mongoose.model("Command", commandSchema);


app.get("/", async (req, res) => {
  try {
    const commands = await Command.find(); 
    res.status(200).json(commands);
  } catch (error) {
    res.status(500).json({ message: "Error fetching commands", error });
  }
});


app.post("/", async (req, res) => {
  const { content, replies } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    const newCommand = new Command({ content, replies: replies || [] });
    await newCommand.save();
    res.status(201).json(newCommand);
  } catch (error) {
    res.status(500).json({ message: "Error saving the command", error });
  }
});


app.put("/", async (req, res) => {
  const { id, content } = req.body;

  try {
    const updatedCommand = await Command.findByIdAndUpdate(id, { content }, { new: true });

    if (!updatedCommand) {
      return res.status(404).json({ message: "Command not found" });
    }

    res.status(200).json(updatedCommand);
  } catch (error) {
    res.status(500).json({ message: "Error updating command", error });
  }
});


app.delete("/", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedCommand = await Command.findByIdAndDelete(id);

    if (!deletedCommand) {
      return res.status(404).json({ message: "Command not found" });
    }

    res.status(200).json({ message: "Command deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting command", error });
  }
});


app.patch("/", async (req, res) => {
  const { id, firstreplies } = req.body;

  try {
    const command = await Command.findById(id);

    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    command.replies.push({ firstreplies });
    await command.save();

    res.status(200).json(command);
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
