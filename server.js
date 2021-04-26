const express = require("express");
// const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "customer app" }));

require("./app/routes/customer.routes")(app);
app.listen(port, () => console.log(`Server is running at port ${port}`));
