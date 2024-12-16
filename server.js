const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 3000;
// LISTINING TO THE SERVER
app.listen(port, () => {
  console.log(`server has been started on port : ${port}`);
});

const server = mongoose.connect(process.env.CON_STR, {
  useNewUrlParser: true,
}).then((con)=>{
  console.log('DB connection successfull');
})