import React from 'react'
import { useParams } from 'react-router'
import { news } from 'dummy-data/news';

const DetailNews = () => {
  const { id } = useParams();

  const newsItem = news.find((data) => data.id === parseInt(id));

  if(!newsItem) {
    return <div>Data tidak ditemukan</div>
  }

  return (
    <>
        <div className='d-flex justify-content-center mb-3'>
            <img src={newsItem.image} alt="gambar_id"/>
        </div>
        <h5>{newsItem.headline}</h5>
        <p>{newsItem.date}</p>
        <p style={{ textAlign: 'justify' }}>{newsItem.body}</p>
    </>
  )
}

export default DetailNews