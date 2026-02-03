import Story from "@/app/lib/models/stories";
import connectMongoDB from "@/app/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE (request: NextRequest, { params }: { params: { id: string }}) {
    try {
        const { id } = await params;
        await connectMongoDB();
        await Story.findByIdAndDelete(id);

        return NextResponse.json({ message: `Story deleted`, data: {id} }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 });
    }
}

export async function PUT (request: NextRequest, { params }: { params: { id: string }}) {
    try {
        await connectMongoDB();

        const { id } = await params;
        const { title: title, synopsis: synopsis } = await request.json();
        const updateStory = await Story.findByIdAndUpdate(id, { title, synopsis }, { new: true });

        return NextResponse.json({ message: `Story updated`, data: updateStory }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update story' }, { status: 500 });
    }
}