import { redirect } from "react-router-dom"
import { fetchData } from "../../services/fetchData"

export async function action({request, params}){
    const formData  = await request.formData()
    const updates  = Object.fromEntries(formData)
    console.log(updates)
    const data  = await fetchData({
        url: `/api/invoices/${params.invoiceId}`,
        method: "PATCH",
        submittedData: {"invoice": updates}
    })
    !!data && redirect(`/invoices/${params.invoiceId}`)
}
export default function InvoiceEdit (){
    return <div>submitting invoice. . .</div>
}