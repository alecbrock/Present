import React, {useState, useEffect} from "react"
import { useLocation } from "react-router-dom";


const ConnectSelf = (props) => {

    props.auth();

    return(
        <h1>Connect self</h1>
    )
}

export default ConnectSelf