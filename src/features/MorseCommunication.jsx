import React from "react"


const MorseCommunication = (props) => {

    props.authPost();

    return(
        <h1>Morse</h1>
    )
}

export default MorseCommunication

//to tell when new word flash a new color for new word
//may need to try out fast option in lifx to counteract delay
//flash a light when incomming morse code
//this can be achieved by hitting the back end every once in awhile for new information
//or maybe from websockets idk ill have to look into that
//once incomming message you will be able to click play message
//will also keep track of your messages like a voicmail and you can replay them
