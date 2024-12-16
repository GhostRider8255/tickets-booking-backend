const express = require("express");
const ticketController = require("./../controller/ticketController");

const router = express.Router();

// router.route("/get").get((req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     message: "ready to book ticket",
//   });
// });

router.route("/create").post(ticketController.createTicket);
router.route("/:userId").get(ticketController.getTicket);

module.exports = router;
