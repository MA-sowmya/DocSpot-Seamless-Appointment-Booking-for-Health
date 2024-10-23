import React, { useEffect, useState, useContext } from "react";
import { Badge, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { UserContext } from "../context/UserContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { notificationsApi, updateNotificationsApi } from "../api/user";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unReadNotificationsCount, setUnReadNotificationsCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getSentNotification();
    }
    const ws = new WebSocket(`ws://localhost:3001/?userId=${userId}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      console.log(event);
      const notification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);

      if (event.data.isRead) {
        setUnReadNotificationsCount((preCount) => preCount + 1);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getSentNotification = async () => {
    const response = await notificationsApi(userId);
    if (response.status === 200) {
      const data = response.data.data;
      let unReadCount = 0;
      const dataNotify = data.map((d) => {
        if (d.isSent) {
          if (!d.isRead) {
            unReadCount = unReadCount + 1;
          }
          return {
            notificationId: d.id,
            refIdType: d.refIdType,
            referenceId: d.referenceId,
            message: d.message,
            timestamp: d.createdAt,
          };
        }
      });
      console.log(unReadCount);

      setNotifications([...dataNotify]);
      setUnReadNotificationsCount(unReadCount);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (notifyId, appId, type) => {
    const response = await updateNotificationsApi(notifyId);
    if (response.status === 200) {
      getSentNotification(userId);
    }
    if (type === "appointmentId") {
      navigate(`/confirmation/${appId}`);
    } else if (type === "doctorId") {
      navigate(`/doctors`);
    }
  };

  const unReadStyle = {
    backgroundColor: "#eeeeee",
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unReadNotificationsCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ height: "500px" }}
      >
        {notifications && notifications?.length === 0 ? (
          <MenuItem>No notifications</MenuItem>
        ) : (
          notifications?.map((notification, index) => (
            <div style={notification.isRead && unReadStyle}>
              <MenuItem
                key={index}
                className="d-flex flex-column justify-content-start align-items-start"
                onClick={() =>
                  handleMenuItemClick(
                    notification?.notificationId,
                    notification?.referenceId,
                    notification?.refIdType
                  )
                }
              >
                <div>{notification.message}</div>
                <div style={{ fontSize: "0.8rem", color: "gray" }}>
                  {moment(notification.timestamp).format("DD-MM-YYYY hh:mmA")}
                </div>
              </MenuItem>
              <Divider />
            </div>
          ))
        )}
      </Menu>
    </div>
  );
};

export default Notifications;
