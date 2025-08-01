import bcrypt from 'bcryptjs';

export const hasPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
export const checkPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
}