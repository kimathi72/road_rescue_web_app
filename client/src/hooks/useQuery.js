import  { useState, useEffect } from "react";

function useQuery({url,method,body}) {
  const [isLoaded, setIsLoaded] = useState(false);
  // rename `posts` to a more generic `data`
  const [data, setData] = useState(null);
  const token =  localStorage.getItem('jwt')
  

  useEffect(() => {
    setIsLoaded(false);
    try{    
   fetch(url,{
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: body && JSON.stringify(body)
      }).then(r=>r.json()).then(data => {
        setData(data);
        setIsLoaded(true);
      })    
    }catch(error){
      console.error(error)
    }  
  }, [url,method,body,token]);
  // the url is now a dependency
  // we want to use the side effect whenever the url changes

  // return an *object* with the data and isLoaded state
  return { data, isLoaded };
}
export default useQuery;
