import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

// Function to handle validation errors asynchronously
export const validationError = async (input: any): Promise<ValidationError[] | false> => {
    // Validate input using class-validator
    const errors = await validate(input, {
        validationError: { target: true }, // Ensure target object is included in error messages
    });

    // If there are validation errors, return them
    if (errors.length) {
        return errors;
    }
    // If no errors, return false
    return false;
};

// Function to validate incoming request body against a specified class
export const RequestValidator = async<T>(
    type: ClassConstructor<T>, // Class constructor for the expected type
    body: any // Incoming request body
): Promise<{ errors: boolean | string; input: T }> => {
    // Convert incoming request body to the specified class instance
    const input = plainToClass(type, body);
    // Check for validation errors
    const errors = await validationError(input);
    
    // If there are validation errors
    if (errors) {
        // Extract error messages and join them
        const errorMessage = errors
            .map((error: ValidationError) => {
                return (Object as any).values(error.constraints) // Get error messages
            }).join(", "); // Join multiple error messages into a single string
        // Return errors along with the input data
        return { errors: errorMessage, input };
    }
    // If no errors, return false for errors and the input data
    return { errors: false, input };
}
