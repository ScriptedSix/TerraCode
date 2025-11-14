// Portfolio API calls
const listPortfolios = async (signal) => {
  try {
    const response = await fetch('/api/portfolios/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

const readPortfolio = async (params, signal) => {
  try {
    const response = await fetch('/api/portfolios/' + params.portfolioId, {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

const createPortfolio = async (credentials, portfolio) => {
  try {
    const response = await fetch('/api/portfolios/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(portfolio)
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

const updatePortfolio = async (params, credentials, portfolio) => {
  try {
    const response = await fetch('/api/portfolios/' + params.portfolioId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(portfolio)
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

const removePortfolio = async (params, credentials) => {
  try {
    const response = await fetch('/api/portfolios/' + params.portfolioId, {
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

export { listPortfolios, readPortfolio, createPortfolio, updatePortfolio, removePortfolio };
