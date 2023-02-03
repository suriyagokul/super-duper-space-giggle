import UserModel from "../model/User.model.js";
import Appointment from "../model/Appointment.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator";
import AppointmentModel from "../model/Appointment.model.js";

// var bcrypt = require("bcryptjs");

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error!" });
  }
}

/** POST http://localhost:3000/api/register */
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Check the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username" });

        resolve();
      });
    });

    // Check the existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique email" });

        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = UserModel({
                username,
                password: hashedPassword,
                profile: profile || " ",
                email,
              });

              //return save result as response

              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Registered Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
  // res.json("register route");
}

/** POST http://localhost:3000/api/login */
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have password" });

            // create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );
            return res.status(200).send({
              msg: "Login Successful...!",
              username: user.username,
              token,
            });
          })
          .catch((error) =>
            res.status(400).send({ error: "Password does not match" })
          );
      })
      .catch((err) => {
        res.status(404).send("Username not found");
      });
  } catch (error) {
    res.status(500).send({ error });
  }
}

/** GET http://localhost:3000/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });

    UserModel.findOne({ username }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user)
        return res.status(500).send({ error: "Couldn't find the User" });

      const { password, ...rest } = Object.assign({}, user.toJSON());
      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: "Cannot  find User Data!" });
  }
}

/** PUT http://localhost:3000/api/updateuser */
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;
    if (userId) {
      const body = req.body;

      UserModel.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;
        return res.status(201).send({ msg: "Record Updated...!" });
      });
    } else {
      return res.status(401).send({ error: "User not found!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** GET http://localhost:3000/api/generateOTP */
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

/** GET http://localhost:3000/api/verifyOTP */
export async function verifyOTP(req, res) {
  const { code } = req.query;

  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ msg: "Verified Successfully" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

// Successfully Redirect when otp is valid
/** GET http://localhost:3000/api/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ msg: "Session expired!" });
}

/** PUT http://localhost:3000/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ msg: "Session expired!" });
    }
    const { username, password } = req.body;
    try {
      UserModel.findOne({ username }).then((user) => {
        bcrypt
          .hash(password, 10)
          .then((hashedPassword) => {
            UserModel.updateOne(
              { username: user.username },
              { password: hashedPassword },
              function (err, data) {
                if (err) throw err;
                return res.status(201).send({ msg: "Record Updated...!" });
              }
            );
          })
          .catch((e) => {
            return res.status(500).send({ e: "Enable to hashed password" });
          });
      });
    } catch (error) {
      return res.status(404).send({ error: "Username not found" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}


export async function createAppointment(req, res)  {
  
  try {
    const date = new Date(req.body.date);
    const appointment = AppointmentModel({
      date,
      time: req.body.time,
      purpose:req.body.purpose
      // time: JSON.stringify(req.body.time),
    });
    
    appointment.save().then(item => {
      // console.log(typeof(date));
      console.log("Item Saved");
      res.send("item saved to database");
      }).catch(err => {
        res.status(400).send("unable to save to database");
        });
  }
  catch(error){
    res.status(500).send({error})
  }
};

export async function getAppointments(req, res) {
  try {
    const appointments = await AppointmentModel.find({ user: req.user.id }).sort({
      date: -1
    });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export async function getAppointment(req, res) {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export async function updateAppointment(req, res) {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    appointment.date = req.body.date;
    appointment.time = req.body.time;
    appointment.purpose = req.body.purpose;

    await appointment.save();

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export async function deleteAppointment(req, res){
  try {
    const appointment = await AppointmentModel.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    await appointment.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};