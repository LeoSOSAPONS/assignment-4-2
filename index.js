const express = require("express");

const app = express();
const port = 3000;
app.use(express.json());

//Data
const fruits = [
  {
    id: 1,
    name: "banana",
  },
  {
    id: 2,
    name: "mango",
  },
];

//Basic Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  res.send("POST request at /login");
});

app.put("/cart", (req, res) => {
  res.send("PUT request at /cart");
});

app.delete("/cart", (req, res) => {
  res.send("DELETE request at /cart");
});

//Route Paramters
app.get("/items/:id", (req, res) => {
  res.json(req.params);
});

//Request Body
app.post("/register", (req, res) => {
  res.json(req.body);
});

//REST routes

//GET /fruits
app.get("/fruits", (req, res) => {
  res.json(fruits);
});

//GET /fruits/:id
app.get("/fruits/:id", (req, res) => {
  for (let fruit of fruits) {
    console.log(req.params.id);
    if (fruit.id == req.params.id) {
      res.status(200);
      return res.send(fruit);
    }
  }
  res.status(404);
  res.send("Fruit not found");
});

//POST /fruits
app.post("/fruits", function (req, res) {
  if (fruits.length > 0 && fruits.some((f) => f.name === req.body.name)) {
    res.status(409);
    return res.send("Fruit already exists");
  }
  let index = fruits[fruits.length - 1].id + 1;
  const newFruit = {
    id: index,
    name: req.body.name,
  };
  fruits.push(newFruit);
  res.json(newFruit);
});

//PUT /fruits/:id
app.put("/fruits/:id", function (req, res) {
  for (let fruit of fruits) {
    if (fruit.id == req.params.id) {
      fruit.name = req.body.name;
      res.status(200);
      return res.send("Update successful");
    }
  }
  res.status(404);
  res.send("Fruit not found");
});
// ...

// DELETE /fruits/:id
app.delete("/fruits/:id", function (req, res) {
  const idToDelete = parseInt(req.params.id, 10);

  const indexToDelete = fruits.findIndex((fruit) => fruit.id === idToDelete);

  if (indexToDelete !== -1) {
    fruits.splice(indexToDelete, 1);
    res.status(200).send("Fruit deleted successfully");
  } else {
    res.status(404).send("Fruit not found");
  }
});

//Assignment - Implement the delete endpoint
//End code here.

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
