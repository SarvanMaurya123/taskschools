import { connect } from '@/app/db/configdb';
import School, { ISchool } from '@/app/models/school';
import { NextResponse } from 'next/server';

// POST Method: Add a new school
export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body: ISchool = await req.json();
        const { name, address, latitude, longitude } = body;

        // Validate input
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connect();

        // Create a new school document
        const newSchool = new School({ name, address, latitude, longitude });
        const savedSchool = await newSchool.save();

        return NextResponse.json(
            { message: 'School added successfully', school: savedSchool },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Error adding school', details: error.message },
            { status: 500 }
        );
    }
}

// DELETE Method: Delete a school by its ID
export async function DELETE(req: Request) {
    try {
        // Extract the 'id' from the request URL path
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop(); // Extract the last part of the URL

        if (!id) {
            return NextResponse.json(
                { error: 'School ID is required' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connect();

        // Find and delete the school by its ID
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