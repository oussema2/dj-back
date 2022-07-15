const eventTypeRouter = require("express").Router();
const EventTypeController = require("../Controllers/EventTypeController");

eventTypeRouter.route("/addEventType").post(EventTypeController.addEventType);
eventTypeRouter
  .route("/getAllEventTypes")
  .get(EventTypeController.getAllEventTypes);

module.exports = eventTypeRouter;
