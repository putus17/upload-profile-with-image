import mongoose, { Document, Schema } from "mongoose";

interface IProfile extends Document {
    name: string;
    age: number;
    gender: string;
    imageURL: string;
}

const profileSchema = new Schema<IProfile>({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,    
    },
    gender: {   
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    }
}, 
{     
    timestamps: true,
});
export default mongoose.model<IProfile>("Profile", profileSchema);