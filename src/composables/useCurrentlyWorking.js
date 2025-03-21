export function useCurrentlyWorking(workExperiences) {
    const onCurrentlyWorkingChanged = (index) => {
      if (workExperiences.value[index].currentlyWorking) {
        workExperiences.value[index].toDate = '';
      }
    };
  
    return {
      onCurrentlyWorkingChanged,
    };
}