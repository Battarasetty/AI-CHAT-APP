import mongoose, { Schema, models, model } from "mongoose";

const ChatSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
        },
        title: {
            type: String,
            default: "New Chat",
        },
    },
    {
        timestamps: true,
    }
);

const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;
