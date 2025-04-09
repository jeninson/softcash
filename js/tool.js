

export async function enviarAjax(info){
    let { url , method, param, fResp} = info
    
    if(param!==undefined && method==="GET") url += "?"+new URLSearchParams(param).toString()
    
    if(method==="POST" || method==="PUT" || method==="DELETE") method = {method, headers: {"Content-Type":"application/json"}, body: JSON.stringify(param)}
    else method = {method, headers: {"Content-Type":"application/json"}}

    try {
        let resp = await fetch(url, method)
        if(!resp.ok) throw new Error("Error en la respuesta del servidor")
        fResp(await resp.json())
    } catch (error) {
        fResp({code: 500, msg: "Error en la solicitud"})
    }
}