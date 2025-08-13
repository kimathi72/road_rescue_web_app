export default async function handleSubmit(url, method, body) {
    const token =localStorage.getItem('jwt') 
    const results = await fetch(url, {
        "method": method, 
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        "body": !!body && JSON.stringify(body)
    })
    const data = await results.json()
    console.log(data)
    return {data}
}