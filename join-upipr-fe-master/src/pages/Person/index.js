import React from 'react';
import styles from './index.module.css';
import axios from "axios"
import {useParams} from "react-router-dom"
function Person() {
  const[isLoading,setLoading]=React.useState(true)
  const[starData,setStarData]=React.useState({})
  const {id}=useParams()
  React.useEffect(()=>{
    axios.get(`https://swapi.dev/api/people/${id}/`)
    .then((res)=>{
      setLoading(true)
      setStarData(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      setLoading(false)
    })

  },[id])
  

  return (
    <div className={styles.person}>
       {isLoading?<div className={styles.loader}>......isLoading</div>:
       <div className={styles.info__container}>
          
                   
           <div>
               <p>Name : &nbsp; {starData.name}</p>
               <p>Height: &nbsp;{starData.height}</p>
               <p>Mass: &nbsp;{starData.mass}</p>
               <p>Hair Color: &nbsp;{starData.hair_color}</p>
               <p>Skin Color:&nbsp; {starData.skin_color}</p>
               <p>Eye Color: &nbsp;{starData.eye_color}</p>
           </div>
      </div>}
    </div>
  );
}

export default Person;
