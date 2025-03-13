<template>
    <div class="sections">
      <div class="technical-skills-container">
        <div class="section-header">
          <h2 class="section-title">{{ sectionData.title }}</h2>
          <p class="italic-gray">*Add Languages</p>
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
  
        <!-- Languages Section (Scrollable Container) -->
        <div class="scrollable-container">
          <div v-for="(language, index) in languagesSection" :key="index" class="languages-section">
            <div class="language-header">
              <h4>Language #{{ index + 1 }}</h4>
              <button v-if="index === 1" class="remove-button" @click="removeLanguage(index)">
                -
              </button>
            </div>
  
            <!-- Language Input and Proficiency Dropdown -->
            <div class="input-row">
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            v-model="language.language"
                            label="Language (e.g., English, Spanish)"
                            :error-messages="languageError[index]"
                            @input="validateLanguage(index)"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-select
                            v-model="language.proficiency"
                            :items="proficiencyOptions"
                            item-text="title"
                            item-value="title"
                            label="Proficiency"
                            :error-messages="proficiencyError[index]"
                            @change="validateProficiency(index)"
                        ></v-select>
                    </v-col>
                </v-row>
            </div>

          </div>
        </div>
  
        <!-- Add Language Button -->
        <button
          v-if="languagesSection.length < 5"
          class="add-button pink-button"
          @click="addLanguages"
        >
          + Add Language
        </button>
  
        <!-- Next Button -->
        <button class="next-button" @click="saveAndNext">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, inject, onMounted } from 'vue';
  
  export default {
    name: 'LanguagesComponent',
    setup() {
      const resumeData = inject('resumeData');
      const sectionData = inject('sectionData');
      const nextSection = inject('nextSection');
      const previousSection = inject('previousSection');
      const currentSection = inject('currentSection');
      const sectionsLength = inject('sectionsLength');
      const updateTitle = inject('updateTitle');
  
      onMounted(() => {
        updateTitle('Resume Builder | Languages');
      });
  
      // Define languages data
      const languagesSection = ref(resumeData.value.languages || [
        {
          language: '',
          proficiency: '',
        },
      ]);
  
      // Error messages for validation
      const languageError = ref(['']);
      const proficiencyError = ref(['']);
  
      // Proficiency options
      const proficiencyOptions = [
        { value: '0', title: '0 - Beginner' },
        { value: '1', title: '1 - Classroom Study' },
        { value: '2', title: '2 - Proficient' },
        { value: '3', title: '3 - Intermediate' },
        { value: '4', title: '4 - Fluent' },
        { value: '5', title: '5 - Advanced' },
     ];
     console.log(proficiencyOptions);
      // Validation rules
      const required = (value) => !!value || 'This field is required';
  
      const addLanguages = () => {
        if (languagesSection.value.length < 5) {
          languagesSection.value.push({
            language: '',
            proficiency: '',
          });
  
          // Initialize error arrays for the new skill
          languageError.value.push('');
          proficiencyError.value.push('');
        }
      };
  
      const removeLanguage = (index) => {
        if (languagesSection.value.length > 1) {
          languagesSection.value.splice(index, 1);
          languageError.value.splice(index, 1);
          proficiencyError.value.splice(index, 1);
        }
      };
  
      const validateLanguage = (index) => {
        if (!languagesSection.value[index].language) {
          languageError.value[index] = 'Language is required';
        } else {
          languageError.value[index] = '';
        }
      };
  
      const validateProficiency = (index) => {
        if (!languagesSection.value[index].proficiency) {
          proficiencyError.value[index] = 'Proficiency is required';
        } else {
          proficiencyError.value[index] = '';
        }
      };
  
      const validateFields = () => {
        let isValid = true;
  
        // Reset error messages
        languageError.value = languagesSection.value.map(() => '');
        proficiencyError.value = languagesSection.value.map(() => '');
  
        languagesSection.value.forEach((skill, index) => {
          validateLanguage(index);
          validateProficiency(index);
  
          if (
            languageError.value[index] ||
            proficiencyError.value[index]
          ) {
            isValid = false;
          }
        });
  
        return isValid;
      };
  
      const saveAndNext = () => {
        if (validateFields()) {
          // Save technical skills data to resumeData in local storage
          let resumeData = JSON.parse(localStorage.getItem('resumeData')) || {};
  
          resumeData.langauges = languagesSection.value;
  
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
        languagesSection,
        languageError,
        proficiencyError,
        proficiencyOptions,
        addLanguages,
        removeLanguage,
        saveAndNext,
        validateLanguage,
        validateProficiency,
        required,
      };
    },
  };
</script>