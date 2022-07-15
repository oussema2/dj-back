const partyRouter = require("express").Router();
const PartyController = require("../Controllers/PartyController");

partyRouter.route("/addParty").post(PartyController.addParty);
module.exports = partyRouter;
