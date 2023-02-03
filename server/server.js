import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";
import bodyParser from "body-parser"
import * as controller from "./controllers/appController.js";
import AppointmentModel from "./model/Appointment.model.js";


const app = express();

/* middlewares */

app.use(express.json({limit: '50mb'}));
app.use(cors({origin: '*'}));
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const port = 3001;

/** Http GET Request */
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

app.get('/appointment', (req, res) => res.json({key: "value"}))


// app.post("/payment", async (request, response) => {
//   const appointment = new AppointmentModel(request.body);
//   console.log(appointment);
//   try {
//     await appointment.save();
//     response.send(appointment);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });



/** api routes */
app.use("/api", router);

/** Start server only when we have valid connection */

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server Connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!",error);
  });
