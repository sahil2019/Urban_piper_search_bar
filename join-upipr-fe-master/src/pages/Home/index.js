import React from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import axios from "axios"
import Suggestions from "../Suggestions/Suggestions"
import {useHistory} from "react-router-dom"


function HomePage() {
   
  const history=useHistory()

  const[search,setSearch]=React.useState("") //forthe search query
  
  const[data,setData]=React.useState([]) // Received data from start wars api

  const[hide,setHide]=React.useState(true)
  
  const[cursor,setCursor]=React.useState(-1)

 
  

function getData(query){
  if(query)
  {
    axios.get(`https://swapi.dev/api/people/?search=${query}`)
 .then((res)=>{
   setData(res.data.results)
   console.log(res.data.results)
    setHide(false)
 })
 .catch((err)=>{
   console.log(err)
 })
 
  }
 
}
const debounceFunction = (getFunc,delay)=>{
  let timer

  return function()
  {
    const context=this
    const args=arguments
     if(timer)
     {
      clearTimeout(timer)
     }
     timer=setTimeout(()=>{
       getFunc.apply(context,args)
     },delay)
  }
}
const debouncesave=React.useCallback(debounceFunction((value)=>getData(value),300),[])

  const handleChange=(e)=>{
     setSearch(e.target.value)
   
     
     if(e.target.value!=""||search!="")
     {
       
      debouncesave(e.target.value)
       setHide(false)
     }
     if(e.target.value==""||search==""||data.length==0)
     {
       setData([])
       setHide(true)
     }
    }
    
  const handleKeyEvent=(e)=>{
  if(e.key=="ArrowDown")
  {
      if(!hide)
      {
        setCursor((c)=>(c<data.length-1)?c+1:c)
      }

  }
  if(e.key=="ArrowUp")
  {
    if(!hide)
    {
      setCursor((c)=>(c>0?c-1:0))
    }
  }
  if (e.key=="Enter"&&cursor>0)
  {
    let arr=data[cursor].url.split("/")

    if(!hide)
    {
      history.push(`/person/${arr[arr.length-2]}`)  
    }
  }

  }
 
  

  return (
    <div className="main__page__cont">
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <input 
        value={search}
        onChange={handleChange}
        className="search-input" 
        placeholder="Search by name" 
        onKeyUp={handleKeyEvent}
        />
       
       {hide?null:(
         <div className="suggestion__bar" >
         {data?.map((item,index)=>
            <Suggestions 
              key={index} 
              {...item}
              isHighLighted={cursor==index?true:false}
            />
         )}
      </div>
       )}
    </div>
  );
}

export default HomePage;
