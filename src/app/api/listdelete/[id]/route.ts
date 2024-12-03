import { connect } from '@/app/db/configdb';
import School from '@/app/models/school';
import { NextRequest, NextResponse } from 'next/server';

// DELETE Method
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        // Validate the ID
        if (!id) {
            return NextResponse.json(
                { error: 'School ID is required' },
                { status: 400 }
            );
        }

        // Connect to the database
        await connect();

        // Find and delete the school
        const deletedSchool = await School.findByIdAndDelete(id);

        if (!deletedSchool) {
            return NextResponse.json(
                { error: 'School not found' },
                { status: 404 }
            );
        }

        // Respond with success
        return NextResponse.json(
            { message: 'School deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error deleting school:', error);

        // Respond with error
        return NextResponse.json(
            { error: 'Error deleting school', details: error.message },
            { status: 500 }
        );
    }
}
