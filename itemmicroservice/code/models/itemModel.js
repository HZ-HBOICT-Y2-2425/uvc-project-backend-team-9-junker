import mongoose from "mongoose";

// Define the schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
});

// Create the model
const ItemModel = mongoose.model("Item", itemSchema);

// Export the model
export default ItemModel;
