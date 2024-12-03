import { connect } from '@/app/db/configdb';
import School from '@/app/models/school';
import { NextRequest, NextResponse } from 'next/server';

// Haversine formula to calculate distance between two latitudes and longitudes
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Difference in radians
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Difference in radians
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Returns the distance in km
};

export async function GET(req: NextRequest) {
    try {
        // Extracting latitude and longitude from query parameters
        const latitude = req.nextUrl.searchParams.get('latitude');
        const longitude = req.nextUrl.searchParams.get('longitude');

        // Validate if latitude and longitude are provided and are numbers
        if (!latitude || !longitude) {
            return NextResponse.json({ error: 'Latitude and Longitude are required' }, { status: 400 });
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return NextResponse.json({ error: 'Invalid Latitude or Longitude' }, { status: 400 });
        }

        // Connect to MongoDB
        await connect();

        // Fetch all schools from MongoDB
        const schools = await School.find();

        // Calculate distance from the user's location to each school
        const schoolsWithDistance = schools.map((school: any) => {
            const distance = haversine(lat, lon, school.latitude, school.longitude);
            return { ...school.toObject(), distance }; // Add distance field to each school
        });

        // Sort schools by distance (ascending order)
        schoolsWithDistance.sort((a: any, b: any) => a.distance - b.distance);

        return NextResponse.json({ schools: schoolsWithDistance });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch schools', details: error.message }, { status: 500 });
    }
}