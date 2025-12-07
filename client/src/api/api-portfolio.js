const list = async(signal) => {
    try {
        const response = await fetch('/api/portfolio/', {
            method: 'GET',
            signal: signal,
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Network error occurred' };
    }
};

const read = async(params, signal) => {
    try {
        const response = await fetch('/api/portfolio/user/' + params.portfolioId, {
            method: 'GET',
            signal: signal,
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Network error occurred' };
    }
};

const getMyPortfolio = async(credentials, signal) => {
    try {
        const response = await fetch('/api/portfolio/my-portfolio', {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Network error occurred' };
    }
};

const create = async(credentials, portfolio) => {
    try {
        const response = await fetch('/api/portfolio/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(portfolio)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Network error occurred' };
    }
};

const update = async(params, credentials, portfolio) => {
    try {
        const response = await fetch('/api/portfolio/', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(portfolio)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Network error occurred' };
    }
};

const remove = async(params, credentials) => {
    try {
        const response = await fetch('/api/portfolio/' + params.portfolioId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Network error occurred' };
    }
};

const addProject = async(credentials, project) => {
    try {
        const response = await fetch('/api/portfolio/project', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(project)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Network error occurred' };
    }
};

const updateProject = async(credentials, projectId, project) => {
    try {
        const response = await fetch('/api/portfolio/project/' + projectId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(project)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Network error occurred' };
    }
};

const removeProject = async(credentials, projectId) => {
    try {
        const response = await fetch('/api/portfolio/project/' + projectId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: 'Network error occurred' };
    }
};

export {
    list,
    read,
    getMyPortfolio,
    create,
    update,
    remove,
    addProject,
    updateProject,
    removeProject
};