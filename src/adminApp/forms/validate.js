const validate = values => {
  const errors = {}
  if (!values.jobTitle) {
    errors.jobTitle = 'Required'
  }else if(values.jobTitle.length > 30) {
    errors.jobTitle = 'Title too long'
  }
  if (!values.jobDescription) {
    errors.jobDescription = 'Required'
  }else if(values.jobDescription.length > 100) {
    errors.jobDescription = 'Description too long'
  }
  if (!values.position){
    errors.position = 'Required'
  }
  if (!values.jobType){
    errors.jobType = 'Required'
  }
  if (!values.jobPostcode) {
    errors.jobPostcode = 'Required'
  }else if(values.jobPostcode.length > 13) {
    errors.jobPostcode = 'Invalid Input'
  }
  if (!values.startDate){
    errors.startDate = "Required"
  }
  if (!values.salaryType){
    errors.salaryType = "Required"
  }
  if (!values.salaryAnnually){
    errors.salaryAnnually = "Required"
  }else if(values.salaryAnnually.length > 9) {
    errors.salaryAnnually = 'Value Too Big'
  }else if(/([A-Za-z@£$%^&*()#;\\])/g.test(values.salaryAnnually)){
    errors.salaryAnnually = 'Invalid Input'
  }
    if (!values.salaryMonthly){
    errors.salaryMonthly = "Required"
  }else if(values.salaryMonthly.length > 8) {
    errors.salaryMonthly = 'Value Too Big'
  }else if(/([A-Za-z@£$%^&*()#;\\])/g.test(values.salaryMonthly)){
    errors.salaryMonthly = 'Invalid Input'
  }
    if (!values.salaryWeekly){
    errors.salaryWeekly = "Required"
  }else if(values.salaryWeekly.length > 7) {
    errors.salaryWeekly = 'Value Too Big'
  }else if(/([A-Za-z@£$%^&*()#;\\])/g.test(values.salaryWeekly)){
    errors.salaryWeekly = 'Invalid Input'
  }
    if (!values.salaryPerHour){
    errors.salaryPerHour = "Required"
  }else if(values.salaryPerHour.length > 5) {
    errors.salaryPerHour = 'Value Too Big'
  }else if(/([A-Za-z@£$%^&*()#;\\])/g.test(values.salaryPerHour)){
    errors.salaryPerHour = 'Invalid Input'
  }
  return errors
}

export default validate
