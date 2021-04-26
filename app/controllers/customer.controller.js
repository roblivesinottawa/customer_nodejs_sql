const Customer = require("../models/customer.model");

exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: "content cannot be empty." });
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active,
  });
  // save customer in the database
  Customer.create(customer, (err, data) =>
    err
      ? res.status(500).send({
          message: err.message || "an error occurred while creating customer",
        })
      : res.data(data),
  );
};

// get all objects
exports.findAll = (req, res) => {
  Customer.getAll((err, data) =>
    err
      ? res.status(500).send({
          message: err.message || "an error occurred while creating customer",
        })
      : res.data(data),
  );
};

// gey only one
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          message: `not found Customer with id ${req.params.customerId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Customer with id ${req.params.customerId}`,
        });
      }
    } else res.send(data);
  });
};
// update a customer identified by the customer id
exports.update = (req, res) => {
  if (!req.body) res.status(400).send({ message: "content cannot be empty." });

  Customer.updateById(req.params.customerId),
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not found") {
          res
            .status(404)
            .send({
              message: `customer with id ${req.params.customerId} not found.`,
            });
        } else {
          res
            .status(500)
            .send({
              message: `Error updating customer with id ${req.params.customerId}`,
            });
        }
      } else res.send(data);
    };
};

// exports.delete = (req, res) => {};
// exports.deleteAll = (req, res) => {};
