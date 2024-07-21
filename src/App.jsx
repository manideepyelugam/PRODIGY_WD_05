import { useState, useSyncExternalStore } from "react";
import "./App.css"


function App(){

  let [data,setdata] = useState(null);
  let [name,setname] = useState("");
  let [err,seterr] = useState(null);

  let fetchdata = () => {
    const apiKey = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=49b43b77478cc521d0f03db0bea151fc&units=metric`;

    fetch(apiKey)
    .then((res)=>{
        if(!res.ok){
          throw new Error("Error in fetching data");
        }

        return res.json();
    })
    .then((response)=>{
        setdata(response)
        seterr(null)
    })
    .catch((error)=>{
        seterr(error.message)
        setdata(null)
    })
  }

  return(
    <>
    <h1>Weather Generator</h1>

    <input type="text" value={name} onChange={(e) => setname(e.target.value)}/>
    <button onClick={fetchdata}>Fetch</button>

    {err && <p>Error : {err}</p>}
    {data && 
       <div>
        <h1>{data.name}</h1>
        <p>Temperature: {data.main.temp} °C</p>
          <p>Description: {data.weather[0].description}</p>
       </div>
    }
    </>
  )
}


export default App