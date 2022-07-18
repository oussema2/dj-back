const Dj = require("../Schemas/DjSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { listenerCount } = require("../Schemas/DjCategorieSchema");
exports.register = (req, res) => {
  const reqBody = req.body;
  const dj = new Dj(reqBody);
  dj.profilePicture = reqBody.images[0];
  dj.pictures = req.body.images;
  dj._id = req.body.id;
  dj.otherTypes = (reqBody.djType + "," + reqBody.otherTypes).split(",");
  dj.password = bcrypt.hashSync(dj.password, 10);
  dj.save((err, dj) => {
    if (err) {
      if (err?.keyPattern["email"] === 1) {
        return res.send({
          status: 400,
          message: "Email Adress is Already Exist !!!",
          attr: "email",
        });
      }
      if (err?.keyPattern["businessName"] === 1) {
        return res.send({
          status: 400,
          message: "Profile Name is Already Exist !!!",
          attr: "businessName",
        });
      }
    }
    res.status(200).send({
      message: "ADDED",
      dj: dj,
      status: 200,
    });
  });
};

exports.login = (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  Dj.findOne({ email: email }, (err, dj) => {
    if (err) {
      return res.send({
        status: 400,
        message: err,
      });
    }
    if (!dj) {
      res.send({
        status: 401,
        message: "Authentification failed , Wrong Email.",
      });
    }
    if (dj && !dj.comparePassword(password)) {
      return res.send({
        status: 401,
        message: "Authentification fails , Invalid Password.",
      });
    }
    if (dj && dj.comparePassword(password)) {
      res.send({
        token: jwt.sign(
          {
            email: dj?.email,
            firstName: dj?.firstName,
            lastName: dj?.lastName,
            _id: dj?._id,
          },

          "RESTFULAPIs"
        ),
        status: 200,
        dj: dj,
      });
    }
  });
};

exports.getUser = (req, res) => {
  if (!req.dj) {
    res.send({
      status: 301,
      message: "unauthorized",
    });
  }

  if (req.dj) {
    Dj.findOne({ _id: req.dj._id }, (err, dj) => {
      checkPartysDate(dj);
      dj.save((err, djSaved) => {
        if (err) {
          res.send({
            status: 401,
            message: err,
          });
        }
        if (djSaved) {
          res.send({
            status: 200,
            dj: djSaved,
          });
        }
      });
    });
  }
};

const checkPartysDate = (dj) => {
  const partyEnded = dj.upcomingPartys.filter((pr) => {
    const date = new Date();
    const prDate = new Date(pr.date);
    return date > prDate ? prDate : null;
  });
  dj.upcomingPartys = dj.upcomingPartys.filter((pr) => {
    const date = new Date();
    const prDate = new Date(pr.date);
    return date < prDate ? prDate : null;
  });
  dj.previousPartys = [...dj.previousPartys, ...partyEnded];
  return dj;
};

exports.getUserNormal = (req, res) => {
  Dj.findOne({ businessName: req.params.id }, (err, dj) => {
    if (err) {
      res.send({
        status: 401,
        message: err,
      });
    }
    if (dj) {
      res.send({
        status: 200,
        dj: dj,
      });
    }
  });
};

exports.getDjs = (req, res) => {
  Dj.find((err, djs) => {
    if (err) {
      res.send({
        status: 401,
        message: err,
      });
    }
    if (djs) {
      res.send({
        status: 200,
        djs: djs,
      });
    }
  });
};

exports.getLast10Dj = (req, res) => {
  var q = Dj.find({ published: true }).sort({ date: -1 }).limit(10);
  q.exec(function (err, djs) {
    // `posts` will be of length 20
    if (err) {
      res.send({
        status: 401,
        message: err,
      });
    }
    if (djs) {
      res.send({
        status: 200,
        djs: djs,
      });
    }
  });
};
exports.getAllDjs = (req, res) => {
  Dj.find((err, djs) => {
    if (err) {
      res.send({
        status: 401,
        message: err,
      });
    }
    if (djs) {
      res.send({
        status: 200,
        djs: djs,
      });
    }
  });
};

exports.getDjByBussinessName = (req, res) => {
  const businessName = req.params.businessName;
  Dj.findOne({ businessName: businessName }, (err, dj) => {
    if (err) {
      res.send({
        status: 401,
        message: err,
      });
    }
    if (dj) {
      res.send({
        status: 200,
        dj: dj,
      });
    }
  });
};

exports.acceptParty = (req, res) => {
  const djid = req.params.dj;
  const partyId = req.params.partyId;
  Dj.findOne({ _id: djid }, (err, dj) => {
    if (err) {
      res.send({
        status: 401,
        message: err,
      });
    }
    if (dj) {
      const party = dj.pendingPartys.filter(
        (item) => item._id.toString() === partyId
      );
      dj.pendingPartys = dj.pendingPartys.filter(
        (item) => item._id.toString() !== partyId
      );
      dj.upcomingPartys.push(party[0]);
      dj.save((err, djres) => {
        if (err) {
          res.send({
            status: 401,
            message: err,
          });
        }
        if (djres) {
          res.send({
            status: 200,
            dj: djres,
          });
        }
      });
      // res.send({
      //   status: 200,
      //   dj: dj,
      // });
    }
  });
};

exports.declineParty = (req, res) => {
  const partyId = req.params.partyId;
  if (!req.dj) {
    res.send({
      status: 301,
      message: "unauthorized",
    });
  }

  Dj.findOne({ _id: req.dj._id }, (err, dj) => {
    if (err) {
      res.send({
        status: 401,
        message: err,
      });
    }
    if (dj) {
      dj.pendingPartys = dj.pendingPartys.filter(
        (item) => item._id.toString() !== partyId
      );
      dj.save((err, djres) => {
        if (err) {
          res.send({
            status: 401,
            message: err,
          });
        }
        if (djres) {
          res.send({
            status: 200,
            dj: djres,
          });
        }
      });
    }
  });
};

exports.searchDj = async (req, res) => {
  var djRes = [];
  const dj = req.params.dj === "fill" ? false : req.params.dj;
  const state = req.params.state === "fill" ? false : req.params.state;
  if (dj && !state) {
    Dj.find({ "djs.otherTypes": { $regex: dj, $options: "i" } }, (err, djs) => {
      if (err) {
        res.send({
          message: err,
          status: 401,
        });
      }
      if (djs) {
        res.send({
          message: err,
          status: 200,
          djs: djs,
        });
      }
    });
  }
  if (state && !dj) {
    const q2 = Dj.find({ state: { $regex: state, $options: "i" } });
    q2.exec((err, djs) => {
      if (err) {
        res.send({
          message: err,
          status: 401,
        });
      }
      if (djs) {
        res.send({
          status: 200,
          djs: djs,
        });
      }
    });
  }
  if (state && dj) {
    Dj.find(
      {
        "djs.otherTypes": { $regex: dj, $options: "i" },
        state: { $regex: state, $options: "i" },
      },
      (err, djs) => {
        if (err) {
          res.send({
            message: err,
            status: 401,
          });
        }
        if (djs) {
          res.send({
            message: err,
            status: 200,
            djs: djs,
          });
        } else {
          res.send({
            message: err,
            status: 200,
            djs: djs,
          });
        }
      }
    );
  }
};
