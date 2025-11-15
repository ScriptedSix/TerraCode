const signin = async(user) => {
    try {
        let response = await fetch('api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
        return { error: 'Network error occurred' }
    }
}

const signup = async(user) => {
    try {
        let response = await fetch('api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
        return { error: 'Network error occurred' }
    }
}

const signout = async() => {
    try {
        let response = await fetch('api/auth/signout/', {
            method: 'GET'
        })
        return await response.json()
    } catch (err) {
        console.log(err)
        return { error: 'Network error occurred' }
    }
}

export { signin, signup, signout }