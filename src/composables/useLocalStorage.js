import { ref, watch } from 'vue';

export function useLocalStorage(key, initialValue, expirationTime) {
  const storedValue = JSON.parse(localStorage.getItem(key));
  const storedTimestamp = localStorage.getItem(`${key}Timestamp`);
  const isExpired = storedTimestamp && (Date.now() - storedTimestamp > expirationTime);

  const value = ref(isExpired ? initialValue : (storedValue || initialValue));

  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    localStorage.setItem(`${key}Timestamp`, Date.now());
  }, { deep: true });

  return { [key]: value };
}
