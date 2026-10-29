const express = require("express");
const { getBasicFeature } = require("./modules/module1");
const { getAdditionalFeature } = require("./modules/module2");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    application: "Multi-Module App",
    version: "v1",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.get("/api/basic", (req, res) => {
  res.json(getBasicFeature());
});

app.get("/api/feature", (req, res) => {
  res.json(getAdditionalFeature());
});

app.get("/api/combined", (req, res) => {
  const basic = getBasicFeature();
  const additional = getAdditionalFeature();

  res.json({
    application: "Multi-Module App",
    version: "v3",
    message: "Both modules are connected",
    modules: {
      module1: basic,
      module2: additional
    }
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});