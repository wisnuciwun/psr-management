import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Alert } from 'reactstrap'
import { BadgeNotif } from './BadgeNotification'

function HomeFooter() {
     const [show, setshow] = useState(false)

     useEffect(() => {
          if (show) {
               setTimeout(() => {
                    setshow(false)
               }, 3000);
          }
     }, [show])

     return (
          <div style={{ bottom: 0, zIndex: 999 }} className='bg-white d-flex justify-content-between align-items-center footer position-absolute w-100 pl-3 pt-4 pb-4 pr-3'>
               <div style={{ gap: '10px' }} className='d-flex align-items-center'>
                    <div>
                         <img src="/assets/logo2.png" style={{ width: '65px' }} alt="" />
                    </div>
                    <div>
                         <div className='font-sm weight-lg aquas'>
                              Kantor sekretariat
                         </div>
                         <div className='font-sm weight-sm'>
                              Blok A No. 11 (Wahyu Saputra)
                         </div>
                         <div className='font-sm weight-lg'>Hotline</div>
                         <div style={{ cursor: 'pointer' }} className='font-sm weight-sm'>
                              0813-20-5000-45&nbsp;&nbsp;&nbsp;&nbsp;
                              <CopyToClipboard onCopy={() => { setshow(true); BadgeNotif.show({text: 'Nomor berhasil dicopy !', delay: '3000', variant: 'success'}) }} text='08132050045'>
                                   <i className='fa fa-clone fa-lg text-dark'></i>
                              </CopyToClipboard>
                              <a href="https://api.whatsapp.com/send?phone=6281320500045" target='_blank' rel='noopener noreferrer' className='text-decoration-none'>
                                   &nbsp;&nbsp;&nbsp;&nbsp;<i className='fa fa-whatsapp fa-lg text-dark'></i>
                              </a>
                         </div>
                         <div className='font-sm weight-sm mt-2'>
                              <i className="fa fa-envelope-o" aria-hidden="true"></i>
                              <a href='mailto:primaswargaresidence@gmail.com'>&nbsp;primaswargaresidence@gmail.com</a>
                         </div>
                         <div className='font-sm weight-sm'>
                              <i className="fa fa-instagram" aria-hidden="true"></i>
                              <a href='https://www.instagram.com/barayaswarga/' target='_blank' rel='noopener noreferrer'>&nbsp;@barayaswarga</a>
                         </div>

                    </div>
               </div>
               <div>
                    &nbsp;
               </div>
          </div>
     )
}

export default HomeFooter