import { watch, nextTick } from 'vue';

export function useDataPersistence(resumeData, fields) {
  for (const fieldName in fields) {
    if (fieldName === 'workExperiences') {
      // Handle workExperiences array
      const storedValue = localStorage.getItem(fieldName);
      if (storedValue) {
        resumeData.value[fieldName] = JSON.parse(storedValue);
      }
      watch(fields[fieldName], (newVal) => {
        resumeData.value[fieldName] = newVal;
        localStorage.setItem(fieldName, JSON.stringify(newVal));
      }, { deep: true }); // Deep watch for array changes
    } else {
      // Handle individual fields
      const storedValue = localStorage.getItem(fieldName);
      if (storedValue) {
        resumeData.value[fieldName] = JSON.parse(storedValue);
        nextTick(() => {
          fields[fieldName].value = JSON.parse(storedValue);
        });
      } else {
        resumeData.value[fieldName] = fields[fieldName].value || '';
      }

      watch(fields[fieldName], (newVal) => {
        resumeData.value[fieldName] = newVal;
        localStorage.setItem(fieldName, JSON.stringify(newVal));
      });
    }
  }
}
