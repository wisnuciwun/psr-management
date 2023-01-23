import React from 'react'
import { Alert } from 'reactstrap'

function BadgeNotification({ text = '', variant = 'success', show = true }) {
     return (
          <Alert hidden={!show} className='position-fixed' style={{ width: '92%', bottom: 0, maxWidth: '470px' }} variant={variant}>
               {text}
          </Alert>
     )
}

export default BadgeNotification