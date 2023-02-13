import mongoose from "mongoose";
import User from "./User.model.js";

export const AppointmentSchema =  mongoose.Schema({
  purpose: {
    type: String,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
    enum: ['8:00 AM', '9:00 AM','10:00 AM','11:00 AM','12:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM', '5:00 PM'],
  },
});

export default mongoose.model.Appointments || mongoose.model("Appointment", AppointmentSchema);
