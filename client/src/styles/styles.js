export const styles = {
    container: {
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f3f4f6, #dbeafe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
    },

    appBar: {
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #e5e7eb",
    },

    toolbar: {
        justifyContent: "space-between",
    },

    headerTitle: {
        fontWeight: 600,
    },

    card: {
        maxWidth: 450,
        width: "100%",
        mt: 8,
        p: 4,
        borderRadius: 3,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },

    logoContainer: {
        display: "flex",
        justifyContent: "center",
        mb: 3,
    },

    logoWrapper: {
        position: "relative",
    },

    logoIcon: {
        fontSize: 64,
        color: "#1e3a8a",
    },

    dotLeft: {
        position: "absolute",
        width: 8,
        height: 8,
        backgroundColor: "#5eead4",
        borderRadius: "50%",
        left: -8,
        top: "50%",
        transform: "translateY(-50%)",
    },

    dotRight: {
        position: "absolute",
        width: 8,
        height: 8,
        backgroundColor: "#5eead4",
        borderRadius: "50%",
        right: -8,
        top: "50%",
        transform: "translateY(-50%)",
    },

    dotTop: {
        position: "absolute",
        width: 8,
        height: 8,
        backgroundColor: "#5eead4",
        borderRadius: "50%",
        left: "50%",
        top: -8,
        transform: "translateX(-50%)",
    },

    dotBottom: {
        position: "absolute",
        width: 8,
        height: 8,
        backgroundColor: "#5eead4",
        borderRadius: "50%",
        left: "50%",
        bottom: -8,
        transform: "translateX(-50%)",
    },

    brandName: {
        fontWeight: 700,
        color: "#1e3a8a",
        mb: 1,
    },

    welcomeText: {
        fontWeight: 600,
        color: "#1e3a8a",
        mb: 4,
    },

    textField: {
        mb: 2,
        "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& input": {
                textAlign: "center",
            },
        },
    },

    errorText: {
        mb: 2,
        fontSize: "0.875rem",
    },

    loginButton: {
        backgroundColor: "#1e3a8a",
        color: "white",
        fontWeight: 600,
        py: 1.5,
        borderRadius: 2,
        mb: 2,
        textTransform: "none",
        fontSize: "1rem",
        "&:hover": {
            backgroundColor: "#1e40af",
        },
    },

    link: {
        display: "block",
        color: "#1e3a8a",
        fontWeight: 600,
        fontSize: "0.875rem",
        mb: 1,
    },
};