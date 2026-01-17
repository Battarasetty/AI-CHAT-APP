import mongoose, { Schema, models, model } from "mongoose";

const MessageSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "ai"],
            required: true,
        },
        type: {
            type: String,
            enum: ["text", "weather", "stock", "f1"],
            required: true,
        },
        content: {
            type: String,
        },
        data: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true, 
    }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
