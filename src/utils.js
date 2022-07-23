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
    console.error(error.response.status);
    return error.response.status;
  } if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request);
    return null;
  }
  // Something happened in setting up the request that triggered an Error
  console.error(error.message);
  return null;
}

export {
  validateEmail, getCssPropertyValue, setCssPropertyValue, handleRequestError,
};
