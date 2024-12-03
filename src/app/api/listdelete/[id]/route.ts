import { connect } from '@/app/db/configdb';
import School from '@/app/models/school';
import { NextResponse } from 'next/server';

// DELETE Method: Delete a school by its ID
export async function DELETE(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params; // Access 'id' from context.params

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
        console.error("Error deleting school:", error); // Log error
        return NextResponse.json(
            { error: 'Error deleting school', details: error.message },
            { status: 500 }
        );
    }
}

// PUT Method: Update a school by its ID
export async function PUT(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params; // Access 'id' from context.params

        if (!id) {
            return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
        }

        const body = await req.json(); // Extract request body for update

        // Connect to MongoDB
        await connect();

        // Find and update the school by its ID
        const updatedSchool = await School.findByIdAndUpdate(id, body, { new: true });

        if (!updatedSchool) {
            return NextResponse.json({ error: 'School not found' }, { status: 404 });
        }

        return NextResponse.json(
            { message: 'School updated successfully', school: updatedSchool },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating school:", error); // Log error
        return NextResponse.json(
            { error: 'Error updating school', details: error.message },
            { status: 500 }
        );
    }
}
