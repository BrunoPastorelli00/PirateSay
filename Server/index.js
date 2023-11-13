const express = require("express");
const app = express ();
const port = 3232;
const router = require('./router');
const path = require("path")
const cors = require("cors")
const corsOptions = {
    origin: 'http://localhost:3001', // This should match the URL of your React app
  };
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router);


  

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})

//comments
