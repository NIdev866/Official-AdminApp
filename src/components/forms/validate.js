const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
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
  if (!values.emailOne) {
    errors.emailOne = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailOne)) {
    errors.emailOne = 'Invalid email address'
  }
  if (!values.emailTwo) {
    errors.emailTwo = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailTwo)) {
    errors.emailTwo = 'Invalid email address'
  }
  if (values.emailOne !== values.emailTwo) {
    errors.emailOne = ''
    errors.emailTwo = 'Emails don\'t match'
  }
  if(!values.address){
    errors.address = 'Required'
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
    errors.CV = 'Required'
  }
  return errors
}

export default validate
