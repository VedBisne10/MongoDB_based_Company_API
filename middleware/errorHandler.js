// This function is used to handle errors that happen in the API
const errorHandler = (error, req, res, next) => {

    // Print the error in the terminal so we can see what went wrong
    console.error(error);


    // Check if the error is caused by invalid data
    if (error.name === "ValidationError") {

        // Get the error message for each field that has a problem
        const errors = Object.values(error.errors).map(
            (item) => item.message
        );

        // Send a 400 response because the data sent by the user is invalid
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors
        });
    }


    // Check if the MongoDB ID provided by the user is not valid
    if (error.name === "CastError") {

        // Send a 400 response because the ID provided is invalid
        return res.status(400).json({
            success: false,
            message: "Invalid ID format"
        });
    }

    // Handle invalid JSON sent in the request
    if (error instanceof SyntaxError && error.status === 400) {

        // Send a 400 response because the JSON is incorrect
        return res.status(400).json({
            success: false,
            message: "Invalid JSON format"
        });
    }

    // If the error is not handled above, treat it as a server error
    // 500 means something went wrong on the server
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};


// Export the function so it can be used in server.js
module.exports = errorHandler;