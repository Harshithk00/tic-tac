import {useState} from "react";

export default function Player({name1, symbol, isActive, onChangeName}){

const [isEditing, setIsEditing] = useState(false);
const [isPlayer, setIsPlayer] = useState(name1);

function handleClick1(){
    setIsEditing(wasEditing => !wasEditing)
    if(isEditing){
        onChangeName(symbol, isPlayer);
    }
    
}

function handleClick2(event){
    console.log(event)
    setIsPlayer(event.target.value)
}


return(
    <li className= {isActive ? 'active' : undefined}>
        <span className="player">
            {!isEditing && <><span className="player-name">{isPlayer}</span>
                <span className="player-symbol">{symbol}</span></>
            }
            {isEditing && <><input type="text" required defaultValue={isPlayer} onChange={handleClick2}/>
            <span className="player-symbol">{symbol}</span></>
            }
        </span>
        <button onClick={handleClick1}>{isEditing ? "Save":"Edit"}</button>
    </li>
    )
}