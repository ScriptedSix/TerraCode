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
    return { error: 'Network error occurred' };
  }
};

const listApplications = async (credentials, signal) => {
  try {
    const response = await fetch('/api/applications/my-applications', {
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
    return { error: 'Network error occurred' };
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
    return { error: 'Network error occurred' };
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
    return { error: 'Network error occurred' };
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
    return { error: 'Network error occurred' };
  }
};

export { 
  createApplication, 
  listApplications, 
  listApplicationsByJob, 
  updateApplicationStatus, 
  removeApplication 
};
