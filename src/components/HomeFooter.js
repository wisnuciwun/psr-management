import React from 'react'

function HomeFooter() {
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
                    <div className='font-md weight-sm'>
                         080391839192
                    </div>
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
          </div>
     )
}

export default HomeFooter