export const REGISTER_JOBSEEKER = 'register_jobseeker';

export function registerJobseeker(Form_data){

  //do the saving of data HERE

  document.write(JSON.stringify(Form_data))

  return{
    type: REGISTER_JOBSEEKER,
    payload: Form_data
  }
}