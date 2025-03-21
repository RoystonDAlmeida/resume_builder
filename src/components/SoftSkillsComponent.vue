<template>
  <div class="sections">
    <div class="technical-skills-container">
      <div class="section-header">
        <h2 class="section-title">{{ sectionData.title }}</h2>
        <p class="italic-gray">*Add Soft Skills</p>
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
            @click="saveAndNext"
            :disabled="currentSection >= sectionsLength - 1"
          >
            &gt;
          </button>
        </div>
      </div>

      <!-- Soft Skills Section (Scrollable Container) -->
      <div class="scrollable-container">
        <!-- Input field for soft skills -->
        <div class="input-row">
          <v-text-field
            v-model="softSkillsModel"
            label="Enter your soft skills (Interpersonal communication, Teamwork etc)"
            :error-messages="softSkillsError"
            @blur="validateSoftSkills"
            @input="clearSoftSkillsError"
          ></v-text-field>
        </div>

        <!-- Next Button -->
        <button class="next-button" @click="saveAndNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue';
import { useDataPersistence } from '../composables/useDataPersistence';

export default {
  name: 'SoftSkillsComponent',
  setup() {
    const resumeData = inject('resumeData');
    const sectionData = inject('sectionData');
    const nextSection = inject('nextSection');
    const previousSection = inject('previousSection');
    const currentSection = inject('currentSection');
    const sectionsLength = inject('sectionsLength');
    const updateTitle = inject('updateTitle');

    // Define soft skills data
    const softSkillsModel = ref('');
    const softSkillsError = ref('');

    onMounted(() => {
      updateTitle('Resume Builder | Soft Skills');
      const storedResumeData = JSON.parse(localStorage.getItem('resumeData')) || {};
      softSkillsModel.value = storedResumeData.softSkills || '';
    });

    const validateSoftSkills = () => {
      if (!softSkillsModel.value?.trim()) {
        softSkillsError.value = 'Soft skills are required';
        return false;
      }
      softSkillsError.value = '';
      return true;
    };

    const clearSoftSkillsError = () => {
      softSkillsError.value = '';
    };

    const saveAndNext = () => {
      const isValid = validateSoftSkills();
      if (isValid) {
        const resumeDataLocal = JSON.parse(localStorage.getItem('resumeData')) || {};
        resumeDataLocal.softSkills = softSkillsModel.value.trim();
        localStorage.setItem('resumeData', JSON.stringify(resumeDataLocal));
        nextSection();
      }
    };

    useDataPersistence(resumeData, { softSkills: softSkillsModel });

    return {
      resumeData,
      sectionData,
      nextSection,
      previousSection,
      currentSection,
      sectionsLength,
      softSkillsModel,
      softSkillsError,
      saveAndNext,
      validateSoftSkills,
      clearSoftSkillsError,
    };
  },
};
</script>