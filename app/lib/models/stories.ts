import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
    {
        title: String,
        synopsis: String,
        is_active: Boolean
    },
    {
        timestamps: true
    }
);

const Story = mongoose.models.Story || mongoose.model('Story', storySchema);

export default Story;