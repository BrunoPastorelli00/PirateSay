const express = require("express");
const app = express ();
const port = 3232;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})