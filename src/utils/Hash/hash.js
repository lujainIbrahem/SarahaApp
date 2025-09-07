import bcrypt from 'bcrypt'


export const hashPass = async ({plainText ,salt_round= process.env.SALT_ROUND} = {} )=>{
    return bcrypt.hashSync( plainText ,Number(salt_round));
    
}