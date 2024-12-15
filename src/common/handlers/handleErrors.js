const handleErrors = (err, setErrors) => {
    const apiErrors = {};
    if (err.response && err.response.data) {
        if (typeof err.response.data === "string") {
            apiErrors.Name = err.response.data;
        } else {
            Object.entries(err.response.data.errors || {}).forEach(([key, value]) => {
                apiErrors[key] = value.join(" ");
            });
        }
    } else if (err.response?.status === 401) {
        apiErrors.general = "Unauthorized. Please log in again.";
    } else {
        console.error("Unexpected error:", err);
        apiErrors.general = "An unexpected error occurred.";
    }
    setErrors(apiErrors);
};

export default handleErrors;
