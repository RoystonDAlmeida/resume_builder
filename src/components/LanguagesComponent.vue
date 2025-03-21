<template>
    <div class="sections">
      <div class="languages-container">
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
              <button v-if="index > 0" class="remove-button" @click="removeLanguage(index)">
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
        <button class="next-button" @click="saveAndNext">Submit</button>
      </div>

      <!-- Generate PDF Button -->
      <button class="generate-pdf-button" @click="handleShowPdfPreview">
        <v-icon class="download-icon" color="white">mdi-download</v-icon>
        Generate PDF
      </button>

      <!-- PDF Preview Dialog -->
      <v-dialog v-model="pdfPreviewVisible" width="900">
        <v-card>
          <v-card-title class="pdf-preview-header">
            <v-spacer></v-spacer>

            <div class="pdf-buttons">
              <v-btn icon @click="handleDownloadPdf" class="pdf-download-button">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              <v-btn icon @click="closePdfPreview">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

          </v-card-title>
          <v-card-text class="pdf-preview-content">
            <iframe
              ref="pdfPreview"
              width="100%"
              height="600px"
              :src="pdfPreviewUrl"
            ></iframe>
          </v-card-text>
        </v-card>
      </v-dialog>

    </div>
  </template>
  
  <script>
  import { ref, inject, onMounted, nextTick } from 'vue';
  import { generatePdf, showPdfPreview, downloadPdf } from '@/utils/pdfPreview';
  
  // Constants
  const PROFICIENCY_OPTIONS = [
        { value: '0', title: '0 - Beginner' },
        { value: '1', title: '1 - Classroom Study' },
        { value: '2', title: '2 - Proficient' },
        { value: '3', title: '3 - Intermediate' },
        { value: '4', title: '4 - Fluent' },
        { value: '5', title: '5 - Advanced' },
  ];

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

      // Define languages data
      const languagesSection = ref( [
        {
          language: '',
          proficiency: '',
        },
      ]);
  
      // Error messages for validation
      const languageError = ref(['']);
      const proficiencyError = ref(['']);
  
      onMounted(() => {
        updateTitle('Resume Builder | Languages');

        // Load languages data from localStorage
        const storedResumeData =
          JSON.parse(localStorage.getItem('resumeData')) || {};
        if (storedResumeData.languages) {
          languagesSection.value = storedResumeData.languages;
        }

        nextTick(() => {
          // Initialize error arrays for the loaded languages
          languageError.value = languagesSection.value.map(() => '');
          proficiencyError.value = languagesSection.value.map(() => '');
        });
      });

      // Proficiency options
      const proficiencyOptions = PROFICIENCY_OPTIONS;

      // Validation rules
      const required = (value) => !!value || 'This field is required';
  
      // Centralized validation function
      const validateField = (value, errorArray, index, fieldName) => {
        if (!value) {
            errorArray.value[index] = `${fieldName} is required`;
        } else {
            errorArray.value[index] = '';
        }
      };

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
            validateField(languagesSection.value[index].language, languageError, index, 'Language');
      };

      const validateProficiency = (index) => {
            validateField(languagesSection.value[index].proficiency, proficiencyError, index, 'Proficiency');
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
            let currentResumeData = JSON.parse(localStorage.getItem('resumeData')) || {};

            currentResumeData.languages = languagesSection.value;

            localStorage.setItem('resumeData', JSON.stringify(currentResumeData));

        }
      };
  
      // PDF preview and download
      const pdfPreviewVisible = ref(false);
      const pdfPreviewUrl = ref('');
      let pdfBlob = null;

      const handleShowPdfPreview = () => {
          const resumeDataValue = JSON.parse(localStorage.getItem('resumeData'));
          pdfBlob = generatePdf(resumeDataValue);
          showPdfPreview(pdfBlob, pdfPreviewUrl, pdfPreviewVisible);
      };

      const handleDownloadPdf = () => {
          downloadPdf(pdfBlob, closePdfPreview);
      };

      const closePdfPreview = () => {
        pdfPreviewVisible.value = false;
        pdfPreviewUrl.value = '';
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
        handleShowPdfPreview,
        pdfPreviewVisible,
        pdfPreviewUrl,
        handleDownloadPdf,
        closePdfPreview,
      };
    },
  };
</script>