const handleErrors = (err, setErrors) => {
    const apiErrors = {};

    if (err.response && err.response.data) {
        // 1) Gdy backend zwraca czysty string (np. "Expense amount: ...")
        if (typeof err.response.data === "string") {
            const str = err.response.data;
            // sprawdź, czy to błąd dot. Amount
            if (str.toLowerCase().includes("amount")) {
                apiErrors.Amount = str;
            } else {
                apiErrors.Name = str;
            }
        } else {
            // 2) Gdy mamy normalny JSON z errors:
            Object.entries(err.response.data.errors || {}).forEach(([key, value]) => {
                let errorKey = key;
                const errorMessage = value.join(" ");

                if (key === "Name" && errorMessage.toLowerCase().includes("amount")) {
                    errorKey = "Amount";
                }

                apiErrors[errorKey] = errorMessage;
            });
        }
    } else if (err.response?.status === 401) {
        apiErrors.general = "Unauthorized. Please log in again.";
    } else {
        console.error("Unexpected error:", err);
        apiErrors.general = "An unexpected error occurred.";
    }

    setErrors(apiErrors);
    console.log("API ERRORS =>", apiErrors);
};

export default handleErrors;
