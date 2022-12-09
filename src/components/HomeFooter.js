import React from 'react'

function HomeFooter() {
     return (
          <div style={{bottom: 0, zIndex: 999}} className='bg-white d-flex justify-content-between align-items-center footer position-absolute w-100'>
               <div className='p-3'>
                    {/* <div className='font-lg weight-xl'>
                         PSR Family
                    </div> */}
                    <div className='font-md weight-lg aquas'>
                         Kantor sekretariat
                    </div>
                    <div className='font-md weight-sm'>
                         Blok A No. 11 (Wahyu Mart)
                    </div>
                    <div className='font-md weight-lg'>Hotline</div>
                    <div className='font-md weight-sm'>
                         080391839192
                    </div>
               </div>
               <div>
                    <img src="/assets/logo2.png" style={{width: '180px'}} alt="" />
               </div>
          </div>
     )
}

export default HomeFooter