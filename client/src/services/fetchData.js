export async function fetchData ({url, method,submittedData}){
    const token = localStorage.getItem('jwt')
    const res = await fetch(url,{
        method: method, 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(!!token && {"Authorization": `Bearer ${token}`})
        },
        ...(!!submittedData &&{ body: JSON.stringify(submittedData)})
    })
    const data = await res?.json() || null
    return data
}