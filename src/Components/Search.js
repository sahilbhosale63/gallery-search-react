import React, { useContext, useEffect, useState } from 'react';
import SinglePhoto from './SinglePhoto';
import styles from '../css/Search.module.css';
import PhotoResponseContext from '../context/PhotoResponseContext';
const axios = require('axios');

export default function Search() {

    const photoResContext = useContext(PhotoResponseContext);
    const [userSearchQuery, setUserSearchQuery] = useState("\"\"");
    const url = `${process.env.REACT_APP_FLICKR_BASE_URL}method=${process.env.REACT_APP_FLICKR_API_METHOD}&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&text=${userSearchQuery}&format=${process.env.REACT_APP_FLICKR_DATA_FORMAT}&per_page=${process.env.REACT_APP_FLICKR_RESULT_PER_PAGE}`;

    useEffect(()=>{        
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSearchQuery])

    console.log("pppp")
    async function getData(){

        await axios.get(url)
            .then(async response =>{
                const content = response.data;
                photoResContext.setPhotoResponse(content.photos.photo);
            })
            .catch(error => console.log(error));
    }

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
        (e.target.value === "")? setUserSearchQuery("\"\"") : setUserSearchQuery(e.target.value)
        getData();
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
                onChange={e => update(e)} />
        </div>
        <div className={styles.photo_grid}>{
                (photoResContext.photoResponse !== undefined)?
                    photoResContext.photoResponse.map(photo => (
                        <SinglePhoto key={photo.id} photoObj={photo} />
                    )) : ""
            }
        </div>
    </div>
    
  )
}
