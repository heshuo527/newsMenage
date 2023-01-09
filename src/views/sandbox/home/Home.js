import React from 'react'
import { Button } from 'antd'
import axios from 'axios'

function Home() {
  const ajax = () => {
    axios.get('http://localhost:5050/comments?_expand=post').then(res => {
      console.log(res.data);
    })
  }

  return (
    <div>
      Home
      <Button type='primary' onClick={() => ajax()}>button</Button>
    </div>
  )
}

export default Home