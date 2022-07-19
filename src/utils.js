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

export { validateEmail, getCssPropertyValue, setCssPropertyValue };
