const express = require("express");
const cors = require("cors");
const router = express.Router();
const upload = require("./middlewares/upload");
router.use(cors());

const capivarasController = require("./controllers/capivarasController");
const capivarasMiddleware = require("./middlewares/capivarasMiddleware");
const habitatsController = require("./controllers/habitatsController");
const habitatsMiddleware = require("./middlewares/habitatsMiddleware");

router.get("/capivaras", capivarasController.getAll);
router.get("/capivaras/:id", capivarasController.getPorId);
router.get(
  "/capivaras/pesquisar/:habitatId",
  capivarasController.getPorHabitat
);
router.post(
  "/capivaras",
  upload.single("foto"),
  capivarasMiddleware.validarBody,
  capivarasController.createCapivara
);
router.delete("/capivaras/:id", capivarasController.deleteCapivara);
router.put(
  "/capivaras/:id",
  upload.single("foto"),
  capivarasMiddleware.validarBody,
  capivarasController.updateCapivara
);

router.get("/habitats", habitatsController.getAll);
router.get("/habitats/:id", habitatsController.getPorId);
router.post(
  "/habitats",
  habitatsMiddleware.validarBody,
  habitatsController.createHabitat
);
router.delete("/habitats/:id", habitatsController.deleteHabitat);
router.put(
  "/habitats/:id",
  habitatsMiddleware.validarBody,
  habitatsController.updateHabitat
);

module.exports = router;
