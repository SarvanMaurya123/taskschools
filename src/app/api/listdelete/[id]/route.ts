import { connect } from '@/app/db/configdb';
import School from '@/app/models/school';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// DELETE Method
export async function DELETE(
    req: Request,
    context: { params: { id: string } } // Correct type for the second argument
) {
    const { id } = context.params; // Correctly access `id` from `params`

    try {
        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid School ID' }, { status: 400 });
        }

        // Connect to MongoDB
        await connect();

        // Find and delete the school by its ID
        const deletedSchool = await School.findByIdAndDelete(id);

        if (!deletedSchool) {
            return NextResponse.json({ error: 'School not found' }, { status: 404 });
        }

        return NextResponse.json(
            { message: 'School deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error deleting school:', error); // Log error
        return NextResponse.json(
            { error: 'Error deleting school', details: error.message },
            { status: 500 }
        );
    }
}
