<template>
    <div class="sections">
      <div class="resume-title-container">
        <h2 class="resume-title">Craft your winning attractive ATS friendly Resume!</h2>
      </div>
      <div class="sections-container">
        <div class="section-header">
          <h2 class="section-title">{{ sectionData.title }}</h2>
          <div class="arrow-container">
            <button
                class="nav-arrow"
                @click="previousSection"
                :disabled="currentSection === 0"
            >
                &lt;
            </button>
            <div class="section-number-bubble">{{ sectionData.number }}</div>
            <button
                class="nav-arrow"
                @click="nextSection"
                :disabled="currentSection >= sectionsLength - 1"
            >
                &gt;
            </button>
          </div>
        </div>
  
        <v-text-field v-model="resumeData.fullName" label="Full Name"></v-text-field>
        <v-text-field v-model="resumeData.phoneNumber" label="Phone Number"></v-text-field>
        <v-text-field v-model="resumeData.email" label="Email"></v-text-field>
        <v-text-field v-model="resumeData.linkedin" label="LinkedIn Profile"></v-text-field>
  
        <button class="next-button" @click="saveAndNext">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import { inject, onMounted, onBeforeUnmount } from 'vue';
  
  export default {
    name: 'ContactInfoComponent',
    setup() {
      const resumeData = inject('resumeData');
      const sectionData = inject('sectionData');
      const nextSection = inject('nextSection');
      const previousSection = inject('previousSection');
      const currentSection = inject('currentSection'); // inject currentSection
      const sectionsLength = inject('sectionsLength'); // inject sectionsLength

      onMounted(() => {
        // Load data from resumeData when component mounts
        resumeData.fullName = resumeData.fullName || '';
        resumeData.phoneNumber = resumeData.phoneNumber || '';
        resumeData.email = resumeData.email || '';
        resumeData.linkedin = resumeData.linkedin || '';
      });

      onBeforeUnmount(() => {
        // Save data to resumeData when component unmounts/switches
      });

      const saveAndNext = () => {
        nextSection();
      };
  
      return {
        resumeData,
        sectionData,
        nextSection,
        previousSection,
        currentSection,
        sectionsLength,
        saveAndNext,
      };
    },
  };
  </script>
  