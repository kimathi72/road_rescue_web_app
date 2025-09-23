export async function fetchData ({url, method,submittedData}){
    const baseUrl =
  import.meta.env.PROD
    ? ''              // Rails will serve this
    : 'http://localhost:3000'; // dev via proxy

    const token = localStorage.getItem('jwt')
    const res = await fetch(`${baseUrl + url}`,{
        method: method, 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(!!token && {"Authorization": `Bearer ${token}`})
        },
        ...(!!submittedData &&{ body: JSON.stringify(submittedData)})
    })
    if (res.status === 204) return null;
    // if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    const data = await res?.json() 
    return data
}