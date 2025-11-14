// Application API calls
const createApplication = async (credentials, application) => {
  try {
    const response = await fetch('/api/applications/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(application)
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

const listApplications = async (credentials, signal) => {
  try {
    const response = await fetch('/api/applications/', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

const listApplicationsByJob = async (params, credentials, signal) => {
  try {
    const response = await fetch('/api/applications/job/' + params.jobId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

const updateApplicationStatus = async (params, credentials, status) => {
  try {
    const response = await fetch('/api/applications/' + params.applicationId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({ status })
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

const removeApplication = async (params, credentials) => {
  try {
    const response = await fetch('/api/applications/' + params.applicationId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

export { 
  createApplication, 
  listApplications, 
  listApplicationsByJob, 
  updateApplicationStatus, 
  removeApplication 
};
