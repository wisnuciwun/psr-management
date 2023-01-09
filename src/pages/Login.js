import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Input, Label } from 'reactstrap'

class Login extends Component {
     constructor(props) {
          super(props)

          this.state = {}
     }
     render() {
          return (
               <>
                    <div className='d-flex align-items-center h-100' style={{minHeight: '70vh'}}>
                         <Container>
                              <Label>Username</Label>
                              <Input />
                              <Label>Password</Label>
                              <Input />
                              <Button className='w-100 mt-4'>Login</Button>
                              <p className='text-center mt-2'>Belum punya akun? <Link to={'/register'} className='pointer'>Register</Link></p>
                         </Container>
                    </div>
               </>
          )
     }
}

export default Login