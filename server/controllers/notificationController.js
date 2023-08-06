const NotificationService = require("../services/notificationService");

exports.createNotification = async (req, res) => {
  try {
    const response = await NotificationService.createNotification(req.body);
    res.send(response);
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.getNotificationsByUserId = async (req, res) => {
  try {
    const response = await NotificationService.getNotificationsByUserId(
      req.params.id
    );
    res.send(response);
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const response = await NotificationService.deleteNotification(
      req.params.id
    );
    if(response) {
        return res.send({message: "Notifications Deleted Successfully", success: true});
    } else {
        return res.send({message: "Error In deleting Notifications", success: false});
    }
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};
