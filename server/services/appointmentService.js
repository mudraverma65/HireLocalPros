const Appointment = require("../models/appointements");

exports.scheduleAppointment = async (appointmentDetails) => {
  try {
    const appointmentTime = appointmentDetails.appointmentTime;
    const appointmentDate = appointmentDetails.appointmentDate;
    const existingAppointment = await Appointment.findOne({
      appointmentTime,
      appointmentDate,
    });
    if (existingAppointment) {
      return {
        success: false,
        message: "This slot is already booked. Please, choose another one.",
      };
    }
    const appointment = new Appointment(appointmentDetails);
    return await appointment.save();
  } catch (error) {
    return error;
  }
};

exports.cancelAppointment = async (appointmentId) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    return appointment;
  } catch (error) {
    return error;
  }
};

exports.getAppointmentsByUserId = async (userId) => {
  try {
    const appointments = await Appointment.find({ userId });
    return appointments;
  } catch (error) {
    return error;
  }
};

exports.getAppointmentsByServiceProviderId = async (serviceProviderUserId) => {
  try {
    const appointments = await Appointment.find({ serviceProviderUserId });
    return appointments;
  } catch (error) {
    return error;
  }
};
