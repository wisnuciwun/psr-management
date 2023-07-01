import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { news } from '../../dummy-data/news';
import { IconEnterOutline, IconSearch } from 'components/Icons';
import { useNavigate } from 'react-router-dom';
import ImageZoomModal from 'components/ImageZoomModal';

function NewsInformation() {
     const navigate = useNavigate();

     const btnAttributes = { backgroundColor: "unset", border: "none", color: "#FEC439" };
     const iconAttributes = { width: 18, height: 18 };
     const fontAttributes = { fontWeight: 600, size: 16 };

     const handleToDetailNews = (id) => {
          navigate(`/berita/${id}`);
     }

     const [modalIsOpen, setModalIsOpen] = useState(false);

     const openModal = () => {
       setModalIsOpen(true);
     }
   
     const closeModal = () => {
       setModalIsOpen(false);
     }

     return (
          <div className={window.location.pathname === '/berita' ? 'p-3' : ''}>
               <div
                    style={{ textJustify: "inter-word", textAlign: "justify" }}
                    className="mb-4"
               >
                    <h5 className="mb-3">Berita</h5>
                    {
                         news.map((data) => (
                              <> 
                                   <Card key={data.id} className='mb-3' style={{ padding: 0 ,boxShadow: "0px 4px 4px 0px #00000040" }} >
                                        {/* <img src={data.image} alt="gambar 1" /> */}
                                        <ImageZoomModal 
                                             key={data.id}
                                             imageUrl={data.image}
                                             openModal={openModal}
                                             closeModal={closeModal}
                                             modalIsOpen={modalIsOpen}     
                                        />
                                        <Card.Body className="font-md font-weight-bold text-truncate">
                                             <div className="font-md text-truncate font-weight-bold">
                                                  <span style={{...fontAttributes, color: "#AAAAAA"}}>{data.date}</span>
                                             </div>
                                             <div className="font-sm text-truncate">
                                                  {data.headline}
                                             </div>
                                        </Card.Body>
                                        <Card.Footer style={{ backgroundColor: 'white' }}>
                                             <div className='d-flex justify-content-evenly'>
                                                  <Button className='w-50' style={{...btnAttributes}}>
                                                       <IconSearch style={{...iconAttributes}} /> <span style={{ ...fontAttributes }}>Baca</span> 
                                                  </Button>
                                                  <Button className='w-50' style={{...btnAttributes}} onClick={() => { handleToDetailNews(data.id) }}>
                                                       <IconEnterOutline style={{...iconAttributes}}/> <span style={{ ...fontAttributes }}>Selengkapnya</span>
                                                  </Button>
                                             </div>
                                        </Card.Footer>
                                   </Card>
                              </>
                         ))
                    }
               </div>
          </div>
     )
}

export default NewsInformation