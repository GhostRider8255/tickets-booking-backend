const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  from: {
    type: String,
    required: [true, "Starting stop is require"],
  },
  to: {
    type: String,
    required: [true, "Ending stop is require"],
  },
  numberOfTickets: {
    type: Number,
    required: true,
  },
  ticketPrise: {
    type: Number,
    required: true,
  },
  buyedAt: {
    type: Date,
    default: Date.now,
  },
});

const ticket = new mongoose.model("Ticket", ticketSchema);

module.exports = ticket;