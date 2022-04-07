import React, { useState } from 'react'
import SinglePhoto from './SinglePhoto'
import styles from '../css/Search.module.css'

export default function Search() {

    const axios = require('axios');
    const [photoResponse, setPhotoResponse] = useState([]);
    const [userSearchQuery, setUserSearchQuery] = useState("");

    const debounce = (func, delay) => {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);

            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };


    const update = debounce(async function (e) {

        setUserSearchQuery(e.target.value);

        const url = `${process.env.REACT_APP_FLICKR_BASE_URL}method=${process.env.REACT_APP_FLICKR_API_METHOD}&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&text=${userSearchQuery}&format=${process.env.REACT_APP_FLICKR_DATA_FORMAT}&per_page=${process.env.REACT_APP_FLICKR_RESULT_PER_PAGE}`;

        await axios.get(url)
            .then(async response =>{
                const content = response.data;
                console.log(content.photos.photo);
                setPhotoResponse(content.photos.photo);
            })
            .catch(error => console.log(error));
    }, 300);

  return (
    <div>
        <div className={styles.main_container}>
            <h1 className={styles.site_title}>Search Photos</h1>
            <input 
                name='search' 
                type="text" 
                placeholder='Search...' 
                className={styles.searchbar}
                onChange={(e)=>{ e.persist(); update(e);}} />
        </div>
        <div className={styles.photo_grid}>{
                (photoResponse !== undefined)?
                    photoResponse.map(photo => (
                        <SinglePhoto key={photo.id} photoObj={photo} />
                    )) : ""
            }
        </div>
    </div>
    
  )
}
