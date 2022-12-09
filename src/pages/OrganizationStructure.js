import { data_member } from 'constants/tempStructure'
import React, { Component, Fragment } from 'react'
import { Card, CardText } from 'reactstrap'

export class OrganizationStructure extends Component {
     render() {
          return (
               <Fragment>
                    <div className='w-100 p-3 d-flex flex-wrap'>
                         {
                              data_member.map((v, id) => {
                                   return (
                                        <Card style={{width: id === 0 ? '100%' : '42%', margin: '10px', borderRadius: '10px'}} body className=''>
                                             <CardText className='font-lg aquas'>{v.name}</CardText>
                                             <img style={{height: '200px', objectFit: 'cover', borderRadius: '10px'}} src={v.img} alt="" />
                                             <CardText className='mt-2'>
                                                  <div className='font-md'>{v.position}</div>
                                                  <div className='font-md font-weight-bold'>{v.address}</div>
                                             </CardText>
                                        </Card>
                                   )
                              })
                         }
                    </div>
               </Fragment>
          )
     }
}

export default OrganizationStructure