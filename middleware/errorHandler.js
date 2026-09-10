const errorHandler = (error, req, res, next) => {

    console.error(error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {

        const errors = Object.values(error.errors).map(
            (item) => item.message
        );

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors
        });
    }

    // Handle invalid MongoDB ID
    if (error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format"
        });
    }

    // Handle unknown server errors
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

module.exports = errorHandler;