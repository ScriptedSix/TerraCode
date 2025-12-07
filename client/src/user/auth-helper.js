const auth = {
    // Check if user is authenticated
    isAuthenticated() {
        if (typeof window == "undefined") return false;

        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'));
        else
            return false;
    },

    // Authenticate user (save JWT to sessionStorage)
    authenticate(jwt, cb) {
        if (typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt));
        cb();
    },

    // Clear JWT from sessionStorage
    clearJWT(cb) {
        if (typeof window !== "undefined")
            sessionStorage.removeItem('jwt');
        cb();
        // Optional: make a signout request to backend
    },

    // Update stored user info
    updateUser(updatedFields, cb) {
        if (typeof window !== "undefined") {
            let jwt = JSON.parse(sessionStorage.getItem('jwt'));

            if (!jwt || !jwt.user) return;

            jwt.user = {
                ...jwt.user,
                ...updatedFields
            };

            sessionStorage.setItem('jwt', JSON.stringify(jwt));
            cb();
        }
    }
};

export default auth;