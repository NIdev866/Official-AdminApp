const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }else if(values.firstName.length > 12) {
    errors.firstName = 'Input too long'
  }else if(values.firstName.match(/[0-9]/g)){
    errors.firstName = "Invalid first name"
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }else if(values.lastName.length > 12) {
    errors.lastName = 'Input too long'
  }else if(values.lastName.match(/[0-9]/g)){
    errors.lastName = "Invalid last name"
  }
  if (!values.ageRange) {
    errors.ageRange = "Required"
  }
  if (!values.gender) {
    errors.gender = 'Required'
  }
  if(!values.nationality) {
    errors.nationality = "Required"
  }
  if(!values.mobileNumber && !values.landlineNumber) {
    errors.mobileNumber = "One valid number required"
    errors.landlineNumber = "One valid number required"
  }
  if (!(/^\d{10}$/.test(values.mobileNumber)) && values.mobileNumber){
    errors.mobileNumber = "Invalid number"
    errors.landlineNumber = ""
  }else if (!(/^\d{10}$/.test(values.landlineNumber)) && values.landlineNumber){
    errors.mobileNumber = ""
    errors.landlineNumber = "Invalid number"
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }else if(values.email.length > 17) {
    errors.email = 'Input too long'
  }
  if (!values.emailCopy) {
    errors.emailCopy = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailCopy)) {
    errors.emailCopy = 'Invalid email address'
  }else if(values.emailCopy.length > 17) {
    errors.emailCopy = 'Input too long'
  }else if (values.email !== values.emailCopy) {
    errors.emailCopy = 'Emails don\'t match'
  }else if(!values.email) {
    errors.emailCopy = ''}
  if(errors.email === "Required" && errors.emailCopy === "Emails don\'t match"){
    errors.emailCopy = ""
  }
  if(errors.email === "Invalid email address" && errors.emailCopy === "Emails don\'t match"){
    errors.emailCopy = ""
  }
  if(!values.postcode){
    errors.postcode = 'Required'
  }else if(values.postcode.length > 12){
    errors.postcode = 'Too long'
  }
  if(!values.houseNumber){
    errors.houseNumber = 'Required'
  }else if(values.houseNumber.length > 6){
    errors.houseNumber = 'Too long'
  }
  if (!values.student) {
    errors.student = 'Required'
  }
  if (!values.first_work_in_uk) {
    errors.first_work_in_uk = 'Required'
  }
  if (!values.self_employed) {
    errors.self_employed = 'Required'
  }
  if (!values.willing_to_travel) {
    errors.willing_to_travel = 'Required'
  }
  if (!values.when_can_start) {
    errors.when_can_start = 'Required'
  }
  if (!values.CV) {
    errors.CV = 'Selection Required'
  }
  return errors
}

export default validate
