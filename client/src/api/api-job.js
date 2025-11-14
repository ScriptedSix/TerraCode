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
  }
};

const searchJobs = async (query, signal) => {
  try {
    const response = await fetch('/api/jobs/search?' + new URLSearchParams(query), {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

export { listJobs, readJob, createJob, updateJob, removeJob, searchJobs };
