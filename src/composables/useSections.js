import { ref, computed } from 'vue';

export function useSections() {
  const sections = ref([
    { name: 'ObjectiveComponent', title: 'Objective', number: 1 },
    { name: 'ContactInfoComponent', title: 'Contact Information', number: 2 },
    { name: 'WorkExperienceComponent', title: 'Work Experience', number: 3 },
    { name: 'EducationComponent', title: 'Education', number: 4 },
    { name: 'TechnicalSkillsComponent', title: 'Technical Skills', number: 5 },
    { name: 'SoftSkillsComponent', title: 'Soft Skills', number: 6 },
    { name: 'LanguagesComponent', title: 'Languages', number: 7 },
  ]);

  const currentSection = ref(0);

  const currentSectionComponent = computed(() => sections.value[currentSection.value].name);
  const sectionData = computed(() => sections.value[currentSection.value]);

  const nextSection = () => {
    if (currentSection.value < sections.value.length - 1) currentSection.value++;
  };

  const previousSection = () => {
    if (currentSection.value > 0) currentSection.value--;
  };

  return {
    sections,
    currentSection,
    currentSectionComponent,
    sectionData,
    nextSection,
    previousSection,
  };
}
