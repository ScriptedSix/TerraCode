// Job API calls
const listJobs = async (signal) => {
  try {
    const response = await fetch('/api/jobs/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch(err) {
    console.log(err);
    return { error: 'Network error occurred' };
  }
};

const readJob = async (params, signal) => {
  try {
    const response = await fetch('/api/jobs/' + params.jobId, {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch(err) {
    console.log(err);
    return { error: 'Network error occurred' };
  }
};

const createJob = async (credentials, job) => {
  try {
    const response = await fetch('/api/jobs/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(job)
    });
    return await response.json();
  } catch(err) {
    console.log(err);
    return { error: 'Network error occurred' };
  }
};

const updateJob = async (params, credentials, job) => {
  try {
    const response = await fetch('/api/jobs/' + params.jobId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(job)
    });
    return await response.json();
  } catch(err) {
    console.log(err);
    return { error: 'Network error occurred' };
  }
};

const removeJob = async (params, credentials) => {
  try {
    const response = await fetch('/api/jobs/' + params.jobId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json();
  } catch(err) {
    console.log(err);
    return { error: 'Network error occurred' };
  }
};

const searchJobs = async (query, signal) => {
  try {
    const response = await fetch('/api/jobs?' + new URLSearchParams(query), {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch(err) {
    console.log(err);
    return { error: 'Network error occurred' };
  }
};

export { listJobs, readJob, createJob, updateJob, removeJob, searchJobs };
