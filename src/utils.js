const notificationsSupported = () => {
  return "Notification" in window;
};

const requestNotificationsPermission = async () => {
  const permission = await Notification.requestPermission();
  return permission === "granted";
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const getCssPropertyValue = (propertyName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(propertyName);
};

const setCssPropertyValue = (element, propertyName, propertyValue) => {
  element.style.setProperty(propertyName, propertyValue);
};

const getRequestResponseStatus = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response;
  }

  throw error;
};

const createRequestErrorMessage = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    if (!error.response.data) {
      if (error.response.status === 0) {
        return error.message;
      }

      return error.response.status;
    }

    return `${error.response.status}, ${error.response.data.detail}`;
  }

  // if (error.request) {
  //   // The request was made but no response was received
  //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //   // http.ClientRequest in node.js
  //   return error.message;
  // }

  // Something happened in setting up the request that triggered an Error
  return error.message;
};

export {
  validateEmail,
  getCssPropertyValue,
  setCssPropertyValue,
  createRequestErrorMessage,
  getRequestResponseStatus,
  requestNotificationsPermission,
  notificationsSupported,
};
