import React from "react";
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

const NotificationComponent = (props) => {
  return (
    <div className="notificationContainer">
      <Typography variant="h6" className="notificationHeader">
        Notifications
      </Typography>
      {props?.notifications?.map((notification) => (
        <Card key={notification.id} className="notificationCard">
          <CardHeader
            avatar={
              <Avatar className="notificationAvatar">
                <NotificationsIcon />
              </Avatar>
            }
            title={notification.title}
            className="notificationHeaderCard"
          />
          <CardContent>
            <Typography variant="body2">{notification.content}</Typography>
          </CardContent>
        </Card>
      ))}
      {props?.notifications?.length === 0 && (
        <Paper className="notificationItem">
          <Typography variant="body2">No new notifications.</Typography>
        </Paper>
      )}
    </div>
  );
};

export default NotificationComponent;
