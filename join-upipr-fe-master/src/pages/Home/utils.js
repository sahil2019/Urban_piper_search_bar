import axios from "axios"


const debounceFunction=(getData,query,delay)=>{
    let timer;
    return function ()
    {
        let context=this
      clearTimeout(timer)
       timer=setTimeout(()=>{
           console.log("hello");
         getData.apply(context,query)
      },Number(delay))
    }

}
const getStarWars=(query,delay)=>{
  return  debounceFunction(getData,query,delay)
}
export default getStarWars