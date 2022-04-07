import React from 'react'
import { Image, Breathing } from 'react-shimmer'
import styles from '../css/SinglePhoto.module.css'

export default function SinglePhoto(props) {

  const { farm, server, id, secret, title} = props.photoObj;

  const photo_url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

  return (
    <div className={styles.single_photo}>
        <Image
          alt={title}
          src={photo_url}
          fallback={<Breathing width={400} height={200} />}
      />
    </div>
  )
}
