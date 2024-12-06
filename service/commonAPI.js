import axios from'axios'

export const commonAPI=async(httpRequest,url,reqBody,reqHeaders)=>{
    const reqconfig={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeaders?reqHeaders:{"Content-Type":"application/json"}
    }
    return await axios(reqconfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}