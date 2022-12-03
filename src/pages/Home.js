import { HomeCarousel } from 'components'
import React, { Component, Fragment } from 'react'

export class Home extends Component {
     render() {
          return (
               <Fragment>
                    <div>
                         <HomeCarousel />
                    </div>
               </Fragment>
          )
     }
}

export default Home