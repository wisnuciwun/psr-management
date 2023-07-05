import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { IconArrowsAngleExpand } from './Icons'

const ImageZoomModal = ({ 
    imageUrl, 
    modalIsOpen,
    openModal,
    closeModal }) => {  
  return (
    <>
        <div style={{ position: "relative", display: "inline-block" }}>
            <img src={imageUrl} alt="Zoomable Image" className='w-100' />
            <span
                style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    zIndex: 1,
                }}
            >
                <Button
                    variant="secondary"
                    style={{ background: 'transparent' }}
                    size="sm"
                    onClick={openModal}
                >
                    <IconArrowsAngleExpand/>
                </Button>
            </span>
        </div>
        <Modal show={modalIsOpen} centered>
            <Modal.Body>
                <img src={imageUrl} alt="Zoomed" className='w-100' />
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "flex-end" }}>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
  </>
  )
}

export default ImageZoomModal