import { connect } from '@/app/db/configdb';
import School from '@/app/models/school';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// PUT Method
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Get the id from params
        const { id } = await params;
        console.log("ID:", id);

        // Check if id is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid School ID' }, { status: 400 });
        }

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
        console.error('Error updating school:', error); // Log error
        return NextResponse.json(
            { error: 'Error updating school', details: error.message },
            { status: 500 }
        );
    }
}
