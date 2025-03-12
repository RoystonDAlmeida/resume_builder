<template>
    <div class="sections">
      <div class="technical-skills-container">
        <div class="section-header">
          <h2 class="section-title">{{ sectionData.title }}</h2>
          <p class="italic-gray">*Add Technical Skills</p>
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
  
        <!-- Soft Skills Section (Scrollable Container) -->
        <div class="scrollable-container">

            <!-- Input field for soft skills -->
            <div class="input-row">
                <v-text-field
                    v-model="softSkillsModel"
                    label="Enter your soft skills(Interpersonal communication, Teamwork etc)"
                    :error-messages="softSkillsError"
                    @input="validatesoftSkills"
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

    onMounted(() => {
      updateTitle('Resume Builder | Soft Skills');
    });

    // Define soft skills data
    const softSkillsModel = ref(resumeData.value.softSkills || '');
    const softSkillsError = ref('');

    // Validation rules
    const required = (value) => !!value || 'This field is required';

    const validatesoftSkills = () => {
      if (!softSkillsModel.value) {
        softSkillsError.value = 'Soft skills are required';
      } else {
        softSkillsError.value = '';
      }
    };

    const validateFields = () => {
      validatesoftSkills();
      return !softSkillsError.value;
    };

    const saveAndNext = () => {
      if (validateFields()) {
        // Save soft skills data to resumeData in local storage
        let resumeDataLocal = JSON.parse(localStorage.getItem('resumeData')) || {};

        resumeDataLocal.softSkills = softSkillsModel.value;

        localStorage.setItem('resumeData', JSON.stringify(resumeDataLocal));

        nextSection();
      }
    };

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
      validatesoftSkills,
      required,
    };
  },
};
</script>
