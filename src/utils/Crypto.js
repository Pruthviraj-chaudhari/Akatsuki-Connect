import CryptoJS from "crypto-js";

const encryptionKey = import.meta.env.VITE_API_ENCRYPTION_KEY;

// Function to encrypt the password and confirmPassword
export const encryptData = (password, confirmPassword) => {

  if(!password || !confirmPassword){
    return 
  }

  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    encryptionKey
  ).toString();
  const encryptedConfirmPassword = CryptoJS.AES.encrypt(
    confirmPassword,
    encryptionKey
  ).toString();
  return { encryptedPassword, encryptedConfirmPassword };
};

// Function to decrypt the password and confirmPassword
export const decryptData = (encryptedData) => {

  if(!encryptedData || encryptedData === null){
    return 
  }

  const decryptedData = { ...encryptedData };
  // Decrypt password
  decryptedData.password = CryptoJS.AES.decrypt(
    encryptedData.password,
    encryptionKey
  ).toString(CryptoJS.enc.Utf8);
  // Decrypt confirmPassword
  decryptedData.confirmPassword = CryptoJS.AES.decrypt(
    encryptedData.confirmPassword,
    encryptionKey
  ).toString(CryptoJS.enc.Utf8);

  console.log("DECRIPT DATA: ", decryptedData);

  return decryptedData;
};
