import  { useState, useEffect, useCallback } from "react";

function useQuery(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  const token = localStorage.getItem('jwt')
  // rename `posts` to a more generic `data`
  const [data, setData] = useState(null);
  const fetchData = useCallback(async()=>{
    try{    
      const res = await fetch(`/api/${url}`,{
        method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": !!`Bearer ${token}` && `Bearer ${token}`
          }
      })
      const data = await res.json()
      setData(data)
      setIsLoaded(true)
    }catch(error){
      console.error(error)
    } 
  },[url, token])
  

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
