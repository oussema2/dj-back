const EventType = require("../Schemas/EventTypeSchema");

exports.addEventType = (req, res) => {
  const eventType = new EventType(req.body);
  eventType.save((err, evType) => {
    if (err) {
      res.send({
        status: 401,
        message: err,
      });
    }
    if (evType) {
      res.send({
        status: 200,
        evType: evType,
      });
    }
  });
};

exports.getAllEventTypes = (req, res) => {
  EventType.find((err, evTypes) => {
    if (err) {
      res.send({
        message: err,
        status: 401,
      });
    }
    if (evTypes) {
      res.send({
        eventType: evTypes,
        status: 200,
      });
    }
  });
};
