// utils/formUtils.js

import { toast } from 'sonner'; // Import your toast library

const checkRequiredFields = (formData, requiredFields) => {
  const isFormValid = requiredFields.every((field) => formData[field]);

  if (!isFormValid) {
    toast.error(`Please fill in all required fields`);
  }

  return isFormValid;
};

export { checkRequiredFields };
