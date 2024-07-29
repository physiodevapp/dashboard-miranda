
import bcryptjs from 'bcryptjs'

export const hashPassword = async (password: string, hashPassword: string): Promise<boolean> => {
  try {

    const isValid = await bcryptjs.compare(password, hashPassword)

    return isValid;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error hashing password: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while hashing the password.');
    }
  }
};