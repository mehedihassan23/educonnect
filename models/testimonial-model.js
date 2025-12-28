import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
    content: {
        required: true,
        type: String,
    },
    user: {
       ref: "User",
        type: Schema.ObjectId,
    },
    courseId: {
        ref: "Course",
        type: Schema.ObjectId,
    },
    rating: {
        required: true,
        type: Number,
    },
});

export const Testimonial = mongoose.models?.Testimonial ?? mongoose.model("Testimonial", testimonialSchema);