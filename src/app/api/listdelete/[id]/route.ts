import { connect } from '@/app/db/configdb';
import School from '@/app/models/school';
import { NextResponse } from 'next/server';

// DELETE Method
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        // Ensure params are properly handled (async)
        const { id } = await params;  // Await params if necessary

        if (!id) {
            return NextResponse.json(
                { error: 'School ID is required' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connect();

        // Delete the school by its ID
        const deletedSchool = await School.findByIdAndDelete(id);

        if (!deletedSchool) {
            return NextResponse.json(
                { error: 'School not found' },
                { status: 404 }
            );
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

