const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const dmca_controller = require("../controllers/dmca.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", dmca_controller.test);
module.exports = router;

//Creating basic routes
router.post("/create", dmca_controller.dmca_create);
router.get("/:id", dmca_controller.dmca_details);
router.put("/:id/update", dmca_controller.dmca_update);
router.delete("/:id/delete", dmca_controller.dmca_delete);
router.get("/", dmca_controller.dmca_findall);
router.delete("/delete", dmca_controller.dmca_deleteItem);
