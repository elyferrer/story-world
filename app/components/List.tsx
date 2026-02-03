'use client';

import axios from "axios";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../store/store";
import { deleteStory, getStories } from "../store/features/storySlice";
import { useDispatch, useSelector } from "react-redux";

interface List {
    stories: any, 
    setSelected: any
};

const List = ({ stories, setSelected }: List) => {
    const story = useSelector((state: any) => state.story);
    const dispatch = useDispatch<AppDispatch>();
    
    const handleDelete = async (id: string) => {
        dispatch(deleteStory(id));
    }

    const getStoriesData = async () => {
        await dispatch(getStories());
    }

    useEffect(() => {
        getStoriesData();
    }, [dispatch])

    useEffect(() => {}, [story])

    return (
        <div className='flex flex-col'>
            { story.stories.length > 0 ? story.stories.map((item: any, index: number) => (
                <div key={index} className='border border-2 border-red-400 mx-4 my-2 px-4 py-2 rounded'>
                    <h1 className='text-xl'>{ item.title }</h1>
                    <p className='py-2'>{ item.synopsis }</p>
                    <button className='bg-green-600 text-white px-3 py-1 rounded cursor-pointer mx-1'
                        onClick={ () => setSelected(item) }>Update</button>
                    <button className='bg-red-500 text-white px-3 py-1 rounded cursor-pointer mx-1'
                        onClick={ () => handleDelete(item._id) }>Delete</button>
                </div>
            )) : ''}
        </div>
    )
}

export default List
