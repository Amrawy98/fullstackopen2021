const Notification = ({ message, errorSuccess }) => {
  if (message === null) {
    return null;
  }

  return <div className={errorSuccess}>{message}</div>;
};

export default Notification;
