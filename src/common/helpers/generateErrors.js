const generateErrors = (err) => {
    const errors = {};
    if (err.response && err.response.data) {
        if (typeof err.response.data === "string") {
            errors.general = err.response.data;
        } else if (err.response.data.errors) {
            for (const [key, messages] of Object.entries(err.response.data.errors)) {
                errors[key] = Array.isArray(messages) ? messages.join(" ") : messages;
            }
        }
    } else {
        errors.general = "An unexpected error occurred. Please try again.";
    }
    return errors;
};

export default generateErrors;
