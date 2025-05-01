import bcrypt from 'bcrypt';
export const hasPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
//comparar los password de base de datos(encriptado) y el que ingresa el usuario
export const checkPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
  // console.log(password)
  // console.log(hashedPassword)
}