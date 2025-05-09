import  { useState, useEffect, useCallback } from "react";

function useQuery(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  // rename `posts` to a more generic `data`
  const [data, setData] = useState(null);
  const fetchData = useCallback(async()=>{
    try{    
      const res = await fetch(url,{
        method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
          }
      })
      const data = await res.json()
      console.log(data)
      setData(data)
      setIsLoaded(true)
    }catch(error){
      console.error(error)
    } 
  },[url])
  

  useEffect(() => {
    setIsLoaded(false);
    fetchData()    
  }, [fetchData]);
  // the url is now a dependency
  // we want to use the side effect whenever the url changes

  // return an *object* with the data and isLoaded state
  return { data, isLoaded };
}
export default useQuery;
