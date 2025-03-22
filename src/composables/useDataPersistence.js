import { watch } from 'vue';

export function useDataPersistence(resumeData, fields) {
    for (const fieldName in fields) {
        const localStorageKey = fieldName;

        if (fieldName === 'workExperiences' || fieldName === 'educationSection') {
            // Handle arrays
            const storedValue = localStorage.getItem(localStorageKey);
            if (storedValue && storedValue !== "undefined") { // IMPORTANT: Check for "undefined"
                try {
                    resumeData.value[fieldName] = JSON.parse(storedValue);
                    fields[fieldName].value = JSON.parse(storedValue)
                } catch (error) {
                    console.error(`Error parsing JSON for ${fieldName}:`, error);
                    resumeData.value[fieldName] = [];
                    fields[fieldName].value = []
                }
            } else {
                // Handle the case where storedValue is null or "undefined"
                resumeData.value[fieldName] = [];
                fields[fieldName].value = [];
            }

            watch(fields[fieldName], (newVal) => {
                localStorage.setItem(localStorageKey, JSON.stringify(newVal));
            }, { deep: true });
        } else {
            // Handle individual fields
            const storedValue = localStorage.getItem(localStorageKey);
            if (storedValue && storedValue !== "undefined") {  // IMPORTANT: Check for "undefined"
                try {
                    const parsedValue = JSON.parse(storedValue);
                     resumeData.value[fieldName] = parsedValue;
                     fields[fieldName].value = parsedValue;

                } catch (error) {
                    console.error(`Error parsing JSON for ${fieldName}:`, error);
                     resumeData.value[fieldName] = '';
                     fields[fieldName].value = '';
                }
            } else {
                 resumeData.value[fieldName] = '';
                 fields[fieldName].value = '';
            }

            watch(fields[fieldName], (newVal) => {
                localStorage.setItem(localStorageKey, JSON.stringify(newVal));
            });
        }
    }
}
