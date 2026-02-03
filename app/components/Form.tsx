'use client';

import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { createStory, updateStory } from '../store/features/storySlice';

interface Form {
    title: string,
    synopsis: string
};

const Form = ({ selected } : { selected: any }) => {
    const story = useSelector((state: any) => state.story);
    const dispatch = useDispatch<AppDispatch>()
    
    const [formData, setFormData] = useState<Form>({
        title: '',
        synopsis: ''
    });

    const [storyId, setStoryId] = useState<number|undefined>(undefined);

    const handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            if (storyId == undefined) {
                await dispatch(createStory(formData))
            } else {
                await dispatch(updateStory({ id: storyId, formData}))
            }
            
            setFormData({ title: '', synopsis: '' });
        } catch (error) {
            console.log(error);
        }
    }

    const populateFormData = () => {
        if(selected?.title != undefined) {
            setFormData({
                title: selected.title,
                synopsis: selected.synopsis
            });

            setStoryId(selected._id);
        }
        
    }

    useEffect(() => {
        populateFormData();
    }, [selected])

    return (
        <div className='min-h-screen w-full bg-red-400 content-center'>
            <form onSubmit={handleSubmit} className='grid gap-4 p-2 w-2/4 bg-white m-auto rounded'>
                <input type='text' name='title' onChange={handleChange} value={formData.title} placeholder='Enter Title' 
                    className='px-3 py-1' autoComplete='off' />
                <textarea name="synopsis" id="synopsis" onChange={handleChange} value={formData.synopsis} placeholder='Enter Synopsis'
                    className='px-3 py-1 resize-none' autoComplete='off'></textarea>
                <button type='submit' className='bg-blue-600 text-white cursor-pointer px-3 py-1 rounded'>{ storyId ? 'Update' : 'Create'} </button>
            </form>
            
        </div>
    )
}

export default Form
