import Story from "@/app/lib/models/stories";
import connectMongoDB from "@/app/lib/mongodbConnection";
import { NextResponse } from "next/server";

export async function POST (request:any) {
    try {
        const { title, synopsis } = await request.json();
        await connectMongoDB();

        const newStory = new Story({ title, synopsis });
        await newStory.save();

        return NextResponse.json({ message: 'Story created', data: newStory }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create story' }, { status: 500 });
    }
}

export async function GET () {
    try {
        await connectMongoDB();
        const stories = await Story.find();

        return NextResponse.json({ stories });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve story' }, { status: 500 });
    }
}