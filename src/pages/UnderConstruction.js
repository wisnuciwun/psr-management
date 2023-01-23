import React from 'react'

function UnderConstruction() {
     return (
          <div style={{ minHeight: '80vh' }} className='h-min-screen w-100 d-flex justify-content-center align-items-center'>
               <div style={{textAlign: 'center'}}>
                    <i className="fa fa-gavel fa-3x" aria-hidden="true"></i>
                    <br />
                    <br />
                    <p>Under Construction</p>
               </div>
          </div>
     )
}

export default UnderConstruction