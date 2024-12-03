import { connect } from '@/app/db/configdb';
import School from '@/app/models/school';
import { NextResponse } from 'next/server';

// DELETE Method
export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<NextResponse<{ error: string; }> | NextResponse<{ message: string; }>> {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { error: 'School ID is required' },
                { status: 400 }
            );
        }
        await connect();
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
        console.error('Error deleting school:', error);
        return NextResponse.json(
            { error: 'Error deleting school', details: error.message },
            { status: 500 }
        );
    }
}

