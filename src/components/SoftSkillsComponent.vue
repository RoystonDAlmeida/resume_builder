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
  
          </div>
        </div>
  
        <!-- Next Button -->
        <button class="next-button" @click="saveAndNext">Next</button>
      </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue';

export default {
  name: 'TechnicalSkillsComponent',
  setup() {
    const resumeData = inject('resumeData');
    const sectionData = inject('sectionData');
    const nextSection = inject('nextSection');
    const previousSection = inject('previousSection');
    const currentSection = inject('currentSection');
    const sectionsLength = inject('sectionsLength');
    const updateTitle = inject('updateTitle');

    onMounted(() => {
      updateTitle('Resume Builder | Technical Skills');
    });

    // Define technical skills data
    const technicalSkillsSection = ref(resumeData.value.technicalSkills || [
      {
        category: '',
        subcategory: '',
      },
    ]);

    // Error messages for validation
    const categoryError = ref(['']);
    const subcategoryError = ref(['']);

    // Validation rules
    const required = (value) => !!value || 'This field is required';

    const addTechnicalSkills = () => {
      if (technicalSkillsSection.value.length < 5) {
        technicalSkillsSection.value.push({
          category: '',
          subcategory: '',
        });

        // Initialize error arrays for the new skill
        categoryError.value.push('');
        subcategoryError.value.push('');
      }
    };

    const removeCategory = (index) => {
      if (technicalSkillsSection.value.length > 1) {
        technicalSkillsSection.value.splice(index, 1);
        categoryError.value.splice(index, 1);
        subcategoryError.value.splice(index, 1);
      }
    };

    const validateCategory = (index) => {
      if (!technicalSkillsSection.value[index].category) {
        categoryError.value[index] = 'Category is required';
      } else {
        categoryError.value[index] = '';
      }
    };

    const validateSubcategory = (index) => {
      if (!technicalSkillsSection.value[index].subcategory) {
        subcategoryError.value[index] = 'Subcategory is required';
      } else {
        subcategoryError.value[index] = '';
      }
    };

    const validateFields = () => {
      let isValid = true;

      // Reset error messages
      categoryError.value = technicalSkillsSection.value.map(() => '');
      subcategoryError.value = technicalSkillsSection.value.map(() => '');

      technicalSkillsSection.value.forEach((skill, index) => {
        validateCategory(index);
        validateSubcategory(index);

        if (categoryError.value[index] || subcategoryError.value[index]) {
          isValid = false;
        }
      });

      return isValid;
    };

    const saveAndNext = () => {
      if (validateFields()) {
        // Save technical skills data to resumeData in local storage
        let resumeData = JSON.parse(localStorage.getItem('resumeData')) || {};

        resumeData.technicalSkills = technicalSkillsSection.value;

        localStorage.setItem('resumeData', JSON.stringify(resumeData));

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
      technicalSkillsSection,
      categoryError,
      subcategoryError,
      addTechnicalSkills,
      removeCategory,
      saveAndNext,
      validateCategory,
      validateSubcategory,
      required,
    };
  },
};
</script>