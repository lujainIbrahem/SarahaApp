import bcrypt from 'bcrypt'

export const comparePass = async ({plainText ,salt_round} = {} )=>{
    return bcrypt.compareSync( plainText ,salt_round);
    
}
