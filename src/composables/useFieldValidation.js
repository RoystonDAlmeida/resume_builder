export function useFieldValidation() {
  const validateField = (value, errorRef, errorMessage, minLength, maxLength, index) => {
    if (!value) {
      // Handling null values

      if (typeof index === 'number' && Array.isArray(errorRef.value)) {
        errorRef.value[index] = errorMessage;
      } else {
        errorRef.value = errorMessage;
      }
      return false;
    } 
    
    else {
      // Handling non-null values
      
      if (typeof index === 'number' && Array.isArray(errorRef.value)) {
        errorRef.value[index] = '';
      } else {
        errorRef.value = '';
      }
      return true;
    }
  };

  return { validateField };
}