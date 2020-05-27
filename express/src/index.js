import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import models, { connectDb } from "./models/index.js";
import routes from "./routes";
import jwt from "jsonwebtoken";

import data from "./db";

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(async (req, res, next) => {
  const token = req.header("token");
  return next();
  // if (req.path === "/auth") return next();
  // if (!token) return res.sendStatus(403);

  // try {
  //   const decodedToken = jwt.verify(token, process.env.SECRET);
  //   req.user = decodedToken.user;
  //   // console.log(decodedToken)
  //   next();
  // } catch (e) {
  //   res.sendStatus(403);
  // }
});

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Routes

app.use("/users", routes.user);
app.use("/documents", routes.document);
app.use("/instances", routes.instance);
app.use("/auth", routes.auth);
app.use("/flavours", routes.flavour);

// Start

connectDb().then(async () => {
  /// Database reset
  await Promise.all([
    models.User.deleteMany({}),
    models.Instance.deleteMany({}),
    models.Flavour.deleteMany({}),
    models.Dataset.deleteMany({}),
    models.Document.deleteMany({}),
  ]);

  await createUsers();
  await createFlavours();
  await createInstances();
  await createDatasets();
  await createDocuments();
});

app.listen(process.env.PORT);

const createUsers = async () => {
  const admin = new models.User({
    username: "admin",
    role: "admin",
    password: "pass",
  });

  const user = new models.User({
    username: "user",
    password: "pass",
  });

  await admin.save();
  await user.save();
};

const createFlavours = async () => {
  for (const flavour of data.Flavours) {
    const newFlavour = models.Flavour;
    await newFlavour.create(flavour);
  }
};
const createInstances = async () => {
  for (const instance of data.Instances) {
    const flavour = await models.Flavour.findOne({
      name: instance.flavour.name,
    });
    instance.flavour = flavour;
    instance.user = await models.User.findOne({
      username: "admin",
    });
    await models.Instance.create(instance);
  }
};
const createDatasets = async () => {
  for (const dataset of data.Datasets) {
    await models.Dataset.create(dataset);
  }
};
const createDocuments = async () => {
  for (const document of data.Documents) {
    document.datasets = await models.Dataset.find();
    await models.Document.create(document);
  }
};
