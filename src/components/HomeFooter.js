import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Alert } from 'reactstrap'

function HomeFooter() {
     const [show, setshow] = useState(false)

     useEffect(() => {
       if(show){
          setTimeout(() => {
               setshow(false)
          }, 3000);
       }
     }, [show])
     
     return (
          <div style={{ bottom: 0, zIndex: 999 }} className='bg-white d-flex justify-content-between align-items-center footer position-absolute w-100 p-2'>
               <div>
                    {/* <div className='font-lg weight-xl'>
                         PSR Family
                    </div> */}
                    <div className='font-sm weight-lg aquas'>
                         Kantor sekretariat
                    </div>
                    <div className='font-md weight-sm'>
                         Blok A No. 11 (Wahyu Saputra)
                    </div>
                    <div className='font-sm weight-lg'>Hotline</div>
                    <CopyToClipboard onCopy={() => {setshow(true)}} text='08132050045'>
                         <div style={{cursor: 'pointer'}} className='font-md weight-sm'>
                              0813-20-5000-45&nbsp;&nbsp;<i className='fa fa-clone'></i>
                         </div>
                    </CopyToClipboard>
                    <div className='font-sm weight-lg'>Email</div>
                    <div className='font-md weight-sm'>
                         primaswargaresidence@gmail.com
                    </div>
                    <div className='font-sm weight-lg'>Instagram</div>
                    <div className='font-md weight-sm'>
                         @barayaswarga
                    </div>
               </div>
               <div>
                    <img src="/assets/logo2.png" style={{ width: '80px' }} alt="" />
               </div>
               <Alert hidden={!show} className='position-absolute' style={{width: '96%', bottom: 0}} variant='success'>
                   Nomor berhasil dicopy !
               </Alert>
          </div>
     )
}

export default HomeFooter