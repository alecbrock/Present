import React, {useState, useEffect} from "react"
import { useLocation } from "react-router-dom";


const MorseCommunication = (props) => {

    props.authPost();

    return(
        <h1>Morse</h1>
    )
}

export default MorseCommunication