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
  
        <!-- Technical Skills Section (Scrollable Container) -->
        <div class="scrollable-container">
          <div v-for="(skill, index) in technicalSkillsSection" :key="index" class="technical-skills-section">
            <div class="category-header">
              <h4>Category #{{ index + 1 }}</h4>
              <button v-if="index === 1" class="remove-button" @click="removeCategory">
                -
              </button>
            </div>

            <!-- Input field for category(eg: Programming Languages) and sub-category(eg: C, C++ etc)-->
            <div class="input-row">
                <v-text-field
                    v-model="skill.category"
                    label="Category (e.g., Programming Languages, Database Management)"
                    :error-messages="categoryError[index]"
                    @input="validateCategory(index)"
                ></v-text-field>
            </div>

            <div class="input-row">
                <v-text-field
                    v-model="skill.subcategory"
                    label="Subcategory (e.g., C, C++, Java)"
                    :error-messages="subcategoryError[index]"
                    @input="validateSubcategory(index)"
                ></v-text-field>
            </div>
  
          </div>
        </div>
  
        <!-- Add Category Button -->
        <button
          v-if="technicalSkillsSection.length < 5"
          class="add-button pink-button"
          @click="addTechnicalSkills"
        >
          + Add Category
        </button>
  
        <!-- Next Button -->
        <button class="next-button" @click="saveAndNext">Next</button>
      </div>
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