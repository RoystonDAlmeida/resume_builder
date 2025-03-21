import { inject } from 'vue';

export function useSectionNavigation() {
  const nextSection = inject('nextSection');
  const previousSection = inject('previousSection');
  const currentSection = inject('currentSection');
  const sectionsLength = inject('sectionsLength');

  return {
    nextSection,
    previousSection,
    currentSection,
    sectionsLength,
  };
}
