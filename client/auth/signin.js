import { useState } from "react"
import Router from "next/router"
import useRequest from "../../hooks/use-request"

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  })

  const onSubmit = (event) => {
    event.preventDefault()
    doRequest()
  }

  return (
    <form onSubmit={ onSubmit }>
      <h1>sign in</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input 
          value={ email }
          onChange={ e => setEmail(e.target.value) }
          className="form-control"
        ></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={ password }
          onChange={ e => setPassword(e.target.value) }
          type="password" 
          className="form-control"
        ></input>
      </div>
      { errors }  
      <button className="btn btn-primary">Sign In</button>
    </form>
  )
  
}