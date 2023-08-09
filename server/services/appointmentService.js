const Appointment = require("../models/appointements");
const User = require("../models/user");
const notificationService = require("./notificationService");

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
    const savedAppointment = await appointment.save();

    // Get the user details for the service provider
    const serviceProvider = await User.findById(
      appointmentDetails.serviceProviderUserId
    );

    // Get the user details for the user who scheduled the appointment
    const user = await User.findById(appointmentDetails.userId);

    // Create and send a notification for the appointment here
    const notificationDetails = {
      userId: appointmentDetails.userId,
      title: "Appointment Scheduled",
      content: `Your appointment has been scheduled successfully with ${serviceProvider.name}.`,
      email: appointmentDetails.contactEmail,
      status: "Appointment Scheduled",
    };

    await notificationService.createNotification(notificationDetails);

    return savedAppointment;
  } catch (error) {
    return error;
  }
};

exports.cancelAppointment = async (appointmentId) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    // Get the user details for the service provider
    const serviceProvider = await User.findById(
      appointment.serviceProviderUserId
    );

    // Get the user details for the user who scheduled the appointment
    const user = await User.findById(appointment.userId);

    // Create and send a notification for the appointment cancellation here
    const notificationDetails = {
      userId: appointment.userId,
      title: "Appointment Cancelled",
      content: `Your appointment with ${serviceProvider.name} has been cancelled.`,
      email: appointment.contactEmail,
      status: "Appointment Cancelled",
    };

    await notificationService.createNotification(notificationDetails);

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
    const appointment = await Appointment.findById({ _id: appointmentId });

    if (!appointment) {
      return {
        success: false,
        message: "Appointment not found",
      };
    }

    if (flag === "cancel") {
      appointment.appointmentStatus = "cancelled";
      await appointment.save();

      // Get the user details for the service provider
      const serviceProvider = await User.findById(
        appointment.serviceProviderUserId
      );

      // Get the user details for the user who scheduled the appointment
      const user = await User.findById(appointment.userId);

      // Create and send a notification for the appointment cancellation here
      const notificationDetails = {
        userId: appointment.userId,
        title: "Appointment Cancelled",
        content: `Your appointment with ${serviceProvider.name} has been cancelled.`,
        email: appointment.contactEmail,
        status: "Appointment Updated",
      };

      await notificationService.createNotification(notificationDetails);
    } else if (flag === "confirm") {
      appointment.appointmentStatus = "confirmed";
      await appointment.save();

      const serviceProvider = await User.findById(
        appointment.serviceProviderUserId
      );

      // Get the user details for the user who scheduled the appointment
      const user = await User.findById(appointment.userId);

      // Create and send a notification for the appointment cancellation here
      const notificationDetails = {
        userId: appointment.userId,
        title: "Appointment Cancelled",
        content: `Your appointment with ${serviceProvider.name} has been cancelled.`,
        email: appointment.contactEmail,
        status: "Appointment Updated",
      };
      await notificationService.createNotification(notificationDetails);
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

exports.updateAppointmentDetails = async (appointmentId, updatedDetails) => {
  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return {
        success: false,
        message: "Appointment not found.",
      };
    }

    // Update the appointment with the new details
    appointment.appointmentTime = updatedDetails.appointmentTime;
    appointment.appointmentDate = updatedDetails.appointmentDate;
    appointment.appointmentStatus = updatedDetails.appointmentStatus;
    appointment.contactEmail = updatedDetails.contactEmail;
    appointment.serviceDescription = updatedDetails.serviceDescription;
    appointment.appointmentDetails = updatedDetails.appointmentDetails;

    await appointment.save();

    // Get the user details for the service provider
    const serviceProvider = await User.findById(
      appointment.serviceProviderUserId
    );

    // Get the user details for the user who scheduled the appointment
    const user = await User.findById(appointment.userId);

    // Create and send a notification for the appointment details update here
    const notificationDetails = {
      userId: appointment.userId,
      title: "Appointment Details Updated",
      content: `Your appointment details with ${serviceProvider.name} have been updated.`,
      email: appointment.contactEmail,
      status: "Appointment Details Updated",
    };

    await notificationService.createNotification(notificationDetails);

    return {
      success: true,
      message: "Appointment details updated successfully",
    };
  } catch (error) {
    return error;
  }
};
