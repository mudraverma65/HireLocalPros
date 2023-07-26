const AppointmentService = require("../services/appointmentService");

exports.scheduleAppointment = async (req, res) => {
  try {
    const { userId, serviceProviderUserId, contactEmail, appointmentTime, appointmentDate } = req.body;

    // Add any necessary validations for the input data here

    const appointmentData = {
      userId,
      serviceProviderUserId,
      appointmentTime,
      appointmentDate,
      contactEmail,
      appointmentStatus: "scheduled", // Assuming the default status is "scheduled"
    };

    console.log("Received API hit for scheduling appointment:", appointmentData);

    const response = await AppointmentService.scheduleAppointment(appointmentData);
    console.log("Appointment scheduled successfully:", response);
    res.send(response);
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    console.log("Received API hit for cancelling appointment. Appointment ID:", req.params.id);

    const response = await AppointmentService.cancelAppointment(req.params.id);
    if (!response) {
      console.log("Appointment not found with ID:", req.params.id);
      return res
        .status(404)
        .json({ message: "Appointment not found", success: false });
    }
    console.log("Appointment cancelled successfully:", response);
    res.send({ message: "Appointment cancelled successfully", success: true });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointmentByUserId = async (req, res) => {
  try {
    console.log("Received API hit for getting appointments by user ID. User ID:", req.params.id);

    const appointments = await AppointmentService.getAppointmentsByUserId(
      req.params.id
    );
    console.log("Appointments found for User ID:", req.params.id, ":", appointments);
    res.send(appointments);
  } catch (error) {
    console.error("Error getting appointments by User ID:", req.params.id, ":", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointmentByServiceProviderId = async (req, res) => {
  try {
    console.log("Received API hit for getting appointments by service provider ID. Service Provider ID:", req.params.id);

    const appointments =
      await AppointmentService.getAppointmentsByServiceProviderId(
        req.params.id
      );
    console.log("Appointments found for Service Provider ID:", req.params.id, ":", appointments);
    res.send(appointments);
  } catch (error) {
    console.error("Error getting appointments by Service Provider ID:", req.params.id, ":", error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    console.log("Received API hit for updating appointment status. Appointment ID:", req.params.id);

    const { status } = req.body;
    if (!status || (status !== "confirm" && status !== "cancel")) {
      return res.status(400).json({ error: "Invalid status. Please provide 'confirm' or 'cancel'" });
    }

    const response = await AppointmentService.updateAppointmentStatus(req.params.id, status);
    console.log("Appointment status updated successfully:", response);
    res.send(response);
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(400).json({ error: error.message });
  }
};
