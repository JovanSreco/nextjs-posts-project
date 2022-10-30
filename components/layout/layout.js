import React, { Fragment, useContext } from "react";
import NotificationContext from "../../context/notification-context";
import MainNavigation from "./main-navigation";
import Notification from "../ui/notification";

function Layout({ children }) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
