const express = require("express");
const app = express();
const path = require("node:path");
const fileRouter = require("./routes/fileRouter");

app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", fileRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error("Error occured : ", error);
  else console.log(`Listening on port : ${PORT}`);
});
