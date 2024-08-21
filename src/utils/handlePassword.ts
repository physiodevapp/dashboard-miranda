
import bcryptjs from 'bcryptjs'

export const checkPassword = async (password: string, hashPassword: string): Promise<boolean> => {
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

export const hashPassword = async (password: string): Promise<string | Error> => {
  try {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);

  } catch (error) {
    if (error instanceof Error)
      throw error;
    else
      throw new Error("Error while trying to hash the password");
  }
};