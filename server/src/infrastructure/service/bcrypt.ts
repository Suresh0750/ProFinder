import {compare} from "bcrypt"


export const checkPassword = async (Password:string,hashStorePass:string)=>{
    try {
        console.log(`req reached checkPassword, ${Password},${hashStorePass}`)
        console.log(await compare(Password,hashStorePass))
        return await compare(Password,hashStorePass)
    } catch (error) {
        console.log(`Error come from ->infrastruce ->service->bcypt\n`,error)
        throw error
    }
}