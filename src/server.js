require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connexion à MongoDB réussie");

    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error);
  });
