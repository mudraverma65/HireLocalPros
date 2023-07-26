const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceProviderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appointmentTime: {
    type: String,
  },
  appointmentDate: {
    type: String,
  },
  appointmentStatus: {
    type: String,
  },
  appointmentDetails: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  serviceDescription: {
    type: String,
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
