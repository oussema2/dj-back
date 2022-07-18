const Dj = require("../Schemas/DjSchema");
const Party = require("../Schemas/PartySchema");

exports.addParty = async (req, res) => {
  const party = new Party(req.body);
  //const djx = await Dj.findById({ _id: req.dj });
  party.save((err, party) => {
    if (err) {
      res.send({
        message: err,
        status: 401,
      });
    }
    if (party) {
      Dj.findById({ _id: req.body.dj }, (err, dj) => {
        if (err) {
          res.send({
            message: err,
            status: 401,
          });
        }
        if (dj) {
          dj.pendingPartys.push(party);
          dj.save((err, dj) => {
            res.send({
              message: "ADDED",
              status: 200,
              party: party,
            });
          });
        }
      });
    }
  });
};
