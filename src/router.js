import { createRouter, createWebHistory } from 'vue-router';
import WorkExperienceComponent from './components/WorkExperienceComponent.vue';
import ContactInfoComponent from './components/ContactInfoComponent.vue';

const routes = [
  {
    path: '/ContactInfo',
    name: 'contactInfo',
    component: ContactInfoComponent,
  },
  {
    path: '/WorkExperience',
    name: 'workExperience',
    component: WorkExperienceComponent,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;