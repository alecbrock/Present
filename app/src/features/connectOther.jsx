import React, {useState, useEffect} from "react"
import { useLocation } from "react-router-dom";


const ConnectOther = (props) => {

    props.authPost();

    return(
        <h1>Connect other</h1>
    )
}

export default ConnectOther