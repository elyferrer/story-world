'use client';

import { useEffect, useState } from 'react';
import Form from './Form';
import List from './List';
import axios from 'axios';

const Story = () => {
    const [data, setData] = useState<any>([]);
    const [selected, setSelected] = useState<any>({});

    const getData = async () => {
        const response = await axios.get('/api/stories');
        
        setData(response.data.stories);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='grid grid-cols-2'>
            <Form selected={selected} />
            <List stories={data} setSelected={setSelected} />
        </div>
    )
}

export default Story
