// check form validation for displaying messages
export const validate = (element, formdata = []) => {
  let error = [true, ""];

  // email validation rule
  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "Must be a valid email" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  // confirm password rule
  if (element.validation.confirm) {
    const valid =
      element.value.trim() == formdata[element.validation.confirm].value;
    const message = `${!valid ? "Passwords do not match." : ""}`;
    error = !valid ? [valid, message] : error;
  }

  // required field rule
  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

// On input typing
export const update = (element, formdata, formName) => {
  // original formdata
  const newFormdata = {
    ...formdata,
  };

  // making the copy of original formdata and mutating there i.e. updating values
  const newElement = {
    ...newFormdata[element.id],
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;

  // Updating the original formdata
  newFormdata[element.id] = newElement;

  return newFormdata;
};

// Getting key-value of input type : eg. email: amir@gmail.com, password: Test@123 - save in mongo DB
export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for (let key in formdata) {
    // we do not want to write confirm password in mongo db
    if (key !== "confirmPassword") {
      dataToSubmit[key] = formdata[key].value;
    }
  }

  return dataToSubmit;
};

// check form validation on submit
export const isFormValid = (formdata, formName) => {
  let formIsValid = true;
  for (let key in formdata) {
    formIsValid = formdata[key].valid && formIsValid;
  }

  return formIsValid;
};

// Reassigning the array to get data in key-value pair
export const populateOptionFields = (formdata, arrayData = [], field) => {
  const newArray = [];
  const newFormdata = { ...formdata };

  arrayData.forEach((item) => {
    newArray.push({ key: item._id, value: item.name });
  });

  newFormdata[field].config.options = newArray;
  return newFormdata;
};

// Reset the field on form success
export const resetFields = (formdata, formName) => {
  const newFormdata = { ...formdata };

  for (let key in newFormdata) {
    if (key === "images") {
      newFormdata[key].value = [];
    } else {
      newFormdata[key].value = "";
    }

    newFormdata[key].valid = "";
    newFormdata[key].touched = "";
    newFormdata[key].validationMessage = "";
  }
  return newFormdata;
};

export const populateFields = (formData, fields) => {
  for (let key in formData) {
    formData[key].value = fields[key];
    formData[key].valid = true;
    formData[key].touched = true;
    formData[key].validationMessage = "";
  }

  return formData;
};
