import { ref } from 'vue';

export function useSectionValidation() {

  const validate = (validationFunction) => {
    if (validationFunction && !validationFunction()) {
      return false;
    }
    return true;
  };

  return {
    validate,
  };
}
