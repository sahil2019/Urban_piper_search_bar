import React from 'react'
import styles from "./Suggestions.module.css"
import {useHistory} from "react-router-dom"
const Suggestions = ({name,birth_year,gender,url,isHighLighted}) => {
    const history=useHistory()
    const arr=url.split("/")

    const handleIndivPage=()=>{
        history.push(`/person/${arr[arr.length-2]}`)
    }
    return (
        <div onClick={handleIndivPage} className={`${styles.indiv__suggestion} ${isHighLighted?`${styles.active__background}`:``} `}>
            <div>
               <p>{name}</p>
               <p style={{color:"grey"}}>{birth_year}</p>
            </div>
            <div>
                {gender}
            </div>
        </div>
    )
}

export default Suggestions
