import {genSalt, hash, compare} from 'bcrypt'
export async function cryptPassword(password: string) {
  const saltRounds = 10; 
  const salt = await genSalt(saltRounds);
  const hashed = await hash(password, salt);
  return hashed;
}

export async function comparePassword(password: string, hash: string) {
    return await compare(password, hash)
}