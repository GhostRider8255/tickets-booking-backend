const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require("../utils/customError");
const Ticket = require("./../model/ticketModel");
const User = require("./../model/userModel");

exports.createTicket = asyncErrorHandler(async (req, res, next) => {
  const { userId, from, to, numberOfTickets, ticketPrise } = req.body;

  const user = await User.findById(userId);
  
  if (!user) {
    const err = new customError(
      "बहुत महेनत लगी है Bro इसे बनाने में! जाकर admin से पूछकर आ |",
      404
    );
    return next(err);
  }

  const newTicket = await Ticket.create({user:userId, from,to,numberOfTickets, ticketPrise});
  
  user.tickets.push(newTicket._id)
  await user.save();

  res.status(200).json({
    status: "success",
    message: "ticket is confirmed successfully",
    newTicket,
  });
});

exports.getTicket = asyncErrorHandler(async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).populate('tickets');

  if(!user){
    const error = new customError(
      "whats you are doing here bro !",
      400
    );
    return next(error);
  }
  
  res.status(200).json({
    status: "success",
    message: "tickets details fetched successfully",
    tickets: user.tickets,
  });
});
