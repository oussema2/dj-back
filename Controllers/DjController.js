const Dj = require("../Schemas/DjSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      console.log(err);
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
    Dj.find(req._id, (err, dj) => {
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
  }
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
