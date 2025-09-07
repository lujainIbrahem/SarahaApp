
import CryptoJS from "crypto-js";


export const decryptPhone = async ({plainText ,SECRET_KEY} = {} )=>{
    return CryptoJS.AES.decrypt( plainText ,SECRET_KEY).toString(CryptoJS.enc.Utf8);
    
}