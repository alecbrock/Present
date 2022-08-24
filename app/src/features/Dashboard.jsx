import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from 'axios'
import RequireAuth from '../RequireAuth'

const Dashboard = (props) => {

  props.auth();

  return (
    <div>

      <h1>Dashboard</h1>
      <button onClick={() => axios.get('http://localhost:3003/login')}>click me!</button>
      <a href="http://localhost:3003/login">Home</a>
    </div>
  )
}

export default Dashboard