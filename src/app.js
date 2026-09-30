const express = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    prix: {
      type: Number,
      required: true,
      min: 0
    },

    categorie: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Produits opérationnelle"
  });
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des produits"
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Identifiant produit invalide"
    });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { nom, description, prix, categorie } = req.body;

    const product = await Product.create({
      nom,
      description,
      prix,
      categorie
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Données du produit invalides",
      error: error.message
    });
  }
});

app.patch("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Données invalides"
    });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Produit invalide"
    });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable"
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      message: "Identifiant produit invalide"
    });
  }
});

module.exports = app;
