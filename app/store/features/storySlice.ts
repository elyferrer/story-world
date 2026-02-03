import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../store";
import axios from "axios";

interface StoryState {
    stories: any,
    story: object|null,
    error: object|null,
    success: object|null,
    loading: boolean
}

interface KnownError { errorMessage: string; }

const initialState: StoryState = {
    stories: [],
    story: {},
    error: null,
    success: null,
    loading: false
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: KnownError;
}>();

export const getStories = createAppAsyncThunk(
    'story/fetchStories',
    async () => {
        try {
            const response:any = await axios.get(`/api/stories`);
            
            return response.data;
        } catch (error:any) {
            return error;
        }
    }
);

export const createStory = createAppAsyncThunk(
    'story/createStory',
    async (formData: object, thunkAPI) => {
        try {
            const response:any = await axios.post('/api/stories', formData);
            
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateStory = createAppAsyncThunk(
    'story/updateStory',
    async ({ id, formData} : { id: any, formData: any }, thunkAPI) => {
        try {
            const response: any = await axios.put(`/api/stories/${id}`, formData);
            
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteStory = createAppAsyncThunk(
    'story/deleteStory',
    async (id: any, thunkAPI) => {
        try {
            const response: any = await axios.delete(`/api/stories/${id}`);
            
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        populateStory: (state, action) => {
            state.story = action.payload;
        }
    },
    extraReducers: (builder) => { 
        builder.addCase(getStories.fulfilled, (state, action) => {
            state.stories = action.payload.stories;
        }),
        builder.addCase(createStory.fulfilled, (state, action) => {
            state.stories.push(action.payload.data);
        }),
        builder.addCase(updateStory.fulfilled, (state, action) => {
            state.stories = state.stories.filter((story: any) => story._id.toString() !== action.payload.data._id);
            state.stories.push(action.payload.data);
        }),
        builder.addCase(deleteStory.fulfilled, (state, action) => {
            state.stories = state.stories.filter((story: any) => story._id.toString() !== action.payload.data.id);
        })
    }
});

export const { populateStory } = storySlice.reducer

export default storySlice.reducer;