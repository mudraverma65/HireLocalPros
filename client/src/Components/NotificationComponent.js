import React from "react";
import useStyles from "../styles/styles";
import {
  Typography,
  Paper,
  Card,
  CardHeader,
  Avatar,
  CardContent,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./NotificationComponent.css"; // Import the CSS file

const NotificationComponent = () => {
  const classes = useStyles();

  // Sample appointment data (you can fetch real appointments from the server)
  const appointments = [
    {
      id: 1,
      title: "New Message",
      content: "You have a new message from a user.",
    },
    {
      id: 2,
      title: "Appointment Reminder",
      content: "Your appointment is scheduled for tomorrow at 2 PM.",
    },
  ];

  return (
    <div className="notificationContainer"> {/* Use className for CSS styles */}
      <Typography variant="h6" className="notificationHeader"> {/* Use className for CSS styles */}
        Notifications
      </Typography>
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="notificationCard"> {/* Use className for CSS styles */}
          <CardHeader
            avatar={
              <Avatar className="notificationAvatar"> {/* Use className for CSS styles */}
                <NotificationsIcon />
              </Avatar>
            }
            title={appointment.title}
            className="notificationHeaderCard" // Use className for CSS styles
          />
          <CardContent>
            <Typography variant="body2">{appointment.content}</Typography>
          </CardContent>
        </Card>
      ))}
      {appointments.length === 0 && (
        <Paper className="notificationItem"> {/* Use className for CSS styles */}
          <Typography variant="body2">No new notifications.</Typography>
        </Paper>
      )}
    </div>
  );
};

export default NotificationComponent;
