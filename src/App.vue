<template>
  <v-app>
    <HeaderComponent />
    <router-view v-if="$route.name" />
    <component v-else :is="currentSectionComponent" />
  </v-app>
</template>

<script>
import { provide, computed, defineAsyncComponent } from 'vue';
import './styles/styles.css';
import HeaderComponent from './components/HeaderComponent.vue';
import { useLocalStorage } from './composables/useLocalStorage';
import { useSections } from './composables/useSections';
import { useTitle } from './composables/useTitle';

const componentNames = [
  'ObjectiveComponent',
  'ContactInfoComponent',
  'WorkExperienceComponent',
  'EducationComponent',
  'TechnicalSkillsComponent',
  'SoftSkillsComponent',
  'LanguagesComponent',
];

export default {
  components: {
    HeaderComponent,
    ...Object.fromEntries(
      componentNames.map((name) => [
        name,
        defineAsyncComponent(() => import(`./components/${name}.vue`)),
      ])
    ),
  },

  setup() {
    const { updateTitle } = useTitle();
    provide('updateTitle', updateTitle);

    const { resumeData } = useLocalStorage(
      'resumeData',
      {
        objective: '',
        fullName: '',
        phoneNumber: '',
        email: '',
        linkedin: '',
      },
      12 * 60 * 60 * 1000
    ); // 12 hours expiration

    const {
      sections,
      currentSection,
      currentSectionComponent,
      sectionData,
      nextSection,
      previousSection,
    } = useSections();

    provide('resumeData', resumeData);
    provide('sectionData', sectionData);
    provide('nextSection', nextSection);
    provide('previousSection', previousSection);
    provide('currentSection', currentSection);
    provide('sectionsLength', computed(() => sections.value.length));

    return {
      resumeData,
      currentSectionComponent,
    };
  },
};
</script>