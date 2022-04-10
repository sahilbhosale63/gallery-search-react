import { useState } from 'react';
import PhotoResponseContext from './PhotoResponseContext';

export default function PhotoResponseState(props) {
    const [photoResponse, setPhotoResponse] = useState([]);
    
    return (
        <PhotoResponseContext.Provider value={{photoResponse, setPhotoResponse}}>
            {props.children}
        </PhotoResponseContext.Provider>
    )
}