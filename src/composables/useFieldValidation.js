import { ref } from 'vue';

export function useFieldValidation() {
  const validateField = (value, errorArray, errorMessage, minLength, maxLength, index) => {
    if (!value) {
      errorArray[index] = errorMessage;
      return false;
    } else {
      errorArray[index] = '';
      return true;
    }
  };

  return { validateField };
}