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

    const response = await AppointmentService.scheduleAppointment(appointmentData);
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const response = await AppointmentService.cancelAppointment(req.params.id);
    if (!response) {
      return res
        .status(404)
        .json({ message: "Appointment not found", success: false });
    }
    res.send({ message: "Appointment cancelled successfully", success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointmentByUserId = async (req, res) => {
  try {
    const appointments = await AppointmentService.getAppointmentsByUserId(
      req.params.id
    );
    res.send(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointmentByServiceProviderId = async (req, res) => {
  try {
    const appointments =
      await AppointmentService.getAppointmentsByServiceProviderId(
        req.params.id
      );
    res.send(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
