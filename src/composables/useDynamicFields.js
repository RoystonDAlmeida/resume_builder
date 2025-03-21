import { ref, nextTick } from 'vue';

export function useDynamicFields(resumeData, fieldName, initialField) {
  const fields = ref(resumeData.value[fieldName] || [initialField]);

  const addField = () => {
    if (fields.value.length < 2) {
      fields.value.push({ ...initialField });
    }
  };

  const removeField = () => {
    if (fields.value.length > 1) {
      fields.value.pop();
    }
  };

  nextTick(() => {
    // Load data from localStorage if it exists
    const storedResumeData = JSON.parse(localStorage.getItem('resumeData')) || {};
    if (storedResumeData[fieldName]) {
      fields.value = storedResumeData[fieldName].map(exp => ({
        ...exp,
        toDate: exp.toDate === 'Present' ? '' : exp.toDate,
      }));
      resumeData.value[fieldName] = storedResumeData[fieldName];
    }
  });

  return {
    [fieldName]: fields,
    [`add${fieldName.charAt(0).toUpperCase() + fieldName.slice(1, -1)}`]: addField,
    [`remove${fieldName.charAt(0).toUpperCase() + fieldName.slice(1, -1)}`]: removeField,
  };
}
