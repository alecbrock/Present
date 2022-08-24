import React, {useState, useEffect} from "react"
import { useLocation } from "react-router-dom";


const ConnectOther = (props) => {

    props.auth();

    return(
        <h1>Connect other</h1>
    )
}

export default ConnectOther