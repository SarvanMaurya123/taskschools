import { connect } from '@/app/db/configdb';
import School, { ISchool } from '@/app/models/school';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id; // Access the ID from dynamic params

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
        return NextResponse.json(
            { error: 'Error deleting school', details: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
        }

        const body = await req.json();



        // Connect to MongoDB
        await connect();

        // Update the school
        const updatedSchool = await School.findByIdAndUpdate(id, body, { new: true });

        if (!updatedSchool) {
            return NextResponse.json({ error: 'School not found' }, { status: 404 });
        }

        return NextResponse.json(
            { message: 'School updated successfully', school: updatedSchool },
            { status: 200 }
        );
    } catch (error: any) {

        return NextResponse.json(
            { error: 'Error updating school', details: error.message },
            { status: 500 }
        );
    }
}