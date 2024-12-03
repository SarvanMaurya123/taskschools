import mongoose, { Schema, Document } from 'mongoose';

export interface ISchool extends Document {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

const SchoolSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'School name is required'],
            trim: true,
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true,
        },
        latitude: {
            type: Number,
            required: [true, 'Latitude is required'],
        },
        longitude: {
            type: Number,
            required: [true, 'Longitude is required'],
        },
    },
    {
        timestamps: true,
    }
);

const School = mongoose.models.School || mongoose.model<ISchool>('School', SchoolSchema);
export default School;
