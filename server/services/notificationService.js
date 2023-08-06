const Notification = require("../models/notifications");
const nodemailer = require("nodemailer");

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hirelocalpros7@gmail.com", 
    // pass: "Hirelocalpros@1234",
    pass: "rgpgcgxvhrwcnjpk" 
  },
});

// Function to send emails
const sendEmail = async (to, subject, content) => {
  try {
    await transporter.sendMail({
      from: "hirelocalpros7@gmail.com",
      to,
      subject,
      text: content,
    });
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

exports.createNotification = async (notificationDetails) => {
  try {
    console.log(notificationDetails);
    const notification = new Notification(notificationDetails);
    const savedNotification = await notification.save();

    // Send an email notification
    const to = notificationDetails.email; // Replace with the actual recipient's email
    const subject = notificationDetails.status;
    const content = "You have a new notification. Check HireLocalPros Application: \n" + notificationDetails.content ;
    await sendEmail(to, subject, content);

    return savedNotification;
  } catch (error) {
    console.error("Error creating notification:", error);
    return error;
  }
};

exports.getNotificationsByUserId = async (userId) => {
  try {
    const notifications = await Notification.find({ userId });
    return notifications;
  } catch (error) {
    console.error("Error getting notifications by userId:", error);
    return error;
  }
};

exports.deleteNotification = async (notificationId) => {
  try {
    const notification = await Notification.findByIdAndDelete(notificationId);
    return notification;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return error;
  }
};
