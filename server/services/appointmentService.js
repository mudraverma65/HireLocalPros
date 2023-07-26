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


exports.getAppointmentById = async (appointmentId) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    return appointment;
  } catch (error) {
    return error;
  }
};

exports.updateAppointmentStatus = async (appointmentId, flag) => {
  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return {
        success: false,
        message: "Appointment not found",
      };
    }

    if (flag === "cancel") {
      appointment.appointmentStatus = "cancelled";
    } else if (flag === "confirm") {
      appointment.appointmentStatus = "confirmed";
    } else {
      return {
        success: false,
        message: "Invalid flag. Please provide 'cancel' or 'approve'",
      };
    }

    await appointment.save();

    return {
      success: true,
      message: `Appointment status updated to '${appointment.appointmentStatus}'`,
    };
  } catch (error) {
    return error;
  }
};
