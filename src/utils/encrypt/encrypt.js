import CryptoJS from "crypto-js";


export const encryptphone = async ({plainText ,SECRET_KEY} = {} )=>{
    return CryptoJS.AES.encrypt( plainText ,SECRET_KEY).toString();
    
}



