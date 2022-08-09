function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function getCssPropertyValue(propertyName) {
  return getComputedStyle(document.documentElement).getPropertyValue(propertyName);
}

function setCssPropertyValue(element, propertyName, propertyValue) {
  element.style.setProperty(propertyName, propertyValue);
}

function handleRequestError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response;
  } if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    throw error;
  }
  // Something happened in setting up the request that triggered an Error
  throw error;
}

export {
  validateEmail, getCssPropertyValue, setCssPropertyValue, handleRequestError,
};
