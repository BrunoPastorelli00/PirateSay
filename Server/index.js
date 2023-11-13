const express = require("express");
const app = express ();
const port = 3232;
const router = require('./router');
var cors = require('cors')

app.use(express.json());
app.use("/", router);
app.use(cors());
  

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})