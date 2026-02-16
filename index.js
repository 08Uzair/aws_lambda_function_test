export const handler = async (event) => {

    try {
        // Check if body exists
        if (!event.body) {
            return response(400, "Request body is missing");
        }

        const body = JSON.parse(event.body);
        const { name, email, message } = body;

        // ---- VALIDATIONS ---- //

        // 1. Required fields
        if (!name || !email || !message) {
            return response(400, "All fields (name, email, message) are required");
        }

        // 2. Trim values
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();

        // 3. Email validation (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return response(400, "Invalid email format");
        }

        // 4. Name length check
        if (trimmedName.length < 3) {
            return response(400, "Name must be at least 3 characters");
        }

        // 5. Message length check
        if (trimmedMessage.length < 10) {
            return response(400, "Message must be at least 10 characters");
        }

        // ---- SUCCESS ---- //
        console.log("Validated Contact Data:", {
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage
        });

        return response(200, "Form submitted successfully");

    } catch (error) {
        console.error("Error:", error);
        return response(500, "Internal server error");
    }
};


// Reusable response function
function response(statusCode, message) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            success: statusCode === 200,
            message
        })
    };
}
