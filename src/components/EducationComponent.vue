<template>
    <div class="sections">
      <div class="education-container">
        <div class="section-header">
          <h2 class="section-title">{{ sectionData.title }}</h2>
          <p class="italic-gray">*Add educational details in reverse chronological order</p>
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
  
        <!-- Education Section (Scrollable Container) -->
        <div class="scrollable-container">
          <div v-for="(education, index) in educationSection" :key="index" class="education-section">
            <div class="education-header">
              <h4>Education #{{ index + 1 }}</h4>
              <button v-if="index === 1" class="remove-button" @click="removeEducation">
                -
              </button>
            </div>
            <div class="input-row">
              <v-text-field
                v-model="education.name"
                label="Degree/PUC/SSLC, Location(eg: BE in Computer Science/PUC/AISSCE(Class 12), Udipi)"
                :error-messages="educationNameError[index]"
                @input="validateEducationName(index)"
              ></v-text-field>
            </div>
  
            <div class="input-row">
              <v-text-field
                v-model="education.insituteName"
                label="Institute / School"
                :error-messages="insituteNameError[index]"
                @input="validateInstituteName(index)"
              ></v-text-field>
            </div>
  
            <div class="input-row">
              <v-text-field
                v-model="education.universityName"
                label="University / Board"
                :error-messages="universityNameError[index]"
                @input="validateUniversityName(index)"
              ></v-text-field>
            </div>
  
            <div class="input-row">
              <v-text-field
                v-model="education.YearOfPassing"
                label="Date of Passing"
                type="date"
                :error-messages="YearOfPassingError[index]"
                @input="validateYearOfPassing(index)"
              ></v-text-field>
            </div>
  
            <div class="input-row">
              <v-text-field
                v-model="education.percentage"
                label="Percentage / GPA"
                :error-messages="percentageError[index]"
                @input="validatePercentage(index)"
              ></v-text-field>
            </div>
          </div>
        </div>
  
        <!-- Add Education Button -->
        <button
          v-if="educationSection.length < 4"
          class="add-button pink-button"
          @click="addEducation"
        >
          + Add Education Details
        </button>
  
        <!-- Next Button -->
        <button class="next-button" @click="saveAndNext">Next</button>
      </div>
    </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue';

export default {
  name: 'EducationComponent',
  setup() {
    const resumeData = inject('resumeData');
    const sectionData = inject('sectionData');
    const nextSection = inject('nextSection');
    const previousSection = inject('previousSection');
    const currentSection = inject('currentSection');
    const sectionsLength = inject('sectionsLength');
    const updateTitle = inject('updateTitle'); 

    onMounted(() => {
      updateTitle('Resume Builder | Education');
    });

    // Define education data
    const educationSection = ref(resumeData.value.education || [
        {
            name: '',
            insituteName: '',
            universityName: '',
            YearOfPassing: '',
            percentage: '',
        },
    ]);

    // Error messages for validation
    const educationNameError = ref(['']);
    const insituteNameError = ref(['']);
    const universityNameError = ref(['']);
    const YearOfPassingError = ref(['']);
    const percentageError = ref(['']);

    // Validation rules
    // Validation rules
    const required = (value) => !!value || 'This field is required';

    const addEducation = () => {
      if (educationSection.value.length < 4) {
        educationSection.value.push({
          name: '',
          insituteName: '',
          universityName: '',
          YearOfPassing: '',
          percentage: '',
        });

        // Initialize error arrays for the new education
        educationNameError.value.push('');
        insituteNameError.value.push('');
        universityNameError.value.push('');
        YearOfPassingError.value.push('');
        percentageError.value.push('');
      }
    };

    const removeEducation = () => {
      if (educationSection.value.length > 1) {
        educationSection.value.pop();
        educationNameError.value.pop();
        insituteNameError.value.pop();
        universityNameError.value.pop();
        YearOfPassingError.value.pop();
        percentageError.value.pop();
      }
    };

    const validateEducationName = (index) => {
      if (!educationSection.value[index].name) {
        educationNameError.value[index] = 'Degree/PUC/SSLC, Location is required';
      } else {
        educationNameError.value[index] = '';
      }
    };

    const validateInstituteName = (index) => {
      if (!educationSection.value[index].insituteName) {
        insituteNameError.value[index] = 'Institute / School is required';
      } else {
        insituteNameError.value[index] = '';
      }
    };

    const validateUniversityName = (index) => {
      if (!educationSection.value[index].universityName) {
        universityNameError.value[index] = 'University / Board is required';
      } else {
        universityNameError.value[index] = '';
      }
    };

    const validateYearOfPassing = (index) => {
      if (!educationSection.value[index].YearOfPassing) {
        YearOfPassingError.value[index] = 'Year of Passing is required';
      } else {
        YearOfPassingError.value[index] = '';
      }
    };

    const validatePercentage = (index) => {
        const percentage = educationSection.value[index].percentage;
        
        if (!percentage) {
            percentageError.value[index] = 'Percentage is required';
        } else {
            const numericValue = parseFloat(percentage);
            
            if (isNaN(numericValue)) {
            percentageError.value[index] = 'Invalid input. Please enter a valid number.';
            } else if (numericValue < 0.0 || numericValue > 100.0) {
            percentageError.value[index] = 'Percentage / CGPA must be between 0.0 and 100.0';
            } else {
            percentageError.value[index] = '';
            }
        }
    };

    const validateFields = () => {
      let isValid = true;

      // Reset error messages
      educationNameError.value = educationSection.value.map(() => '');
      insituteNameError.value = educationSection.value.map(() => '');
      universityNameError.value = educationSection.value.map(() => '');
      YearOfPassingError.value = educationSection.value.map(() => '');
      percentageError.value = educationSection.value.map(() => '');

      educationSection.value.forEach((education, index) => {
        validateEducationName(index);
        validateInstituteName(index);
        validateUniversityName(index);
        validateYearOfPassing(index);
        validatePercentage(index);

        if (educationNameError.value[index] || insituteNameError.value[index] || universityNameError.value[index] || YearOfPassingError.value[index] || percentageError.value[index]) {
          isValid = false;
        }
      });

      return isValid;
    };

    const saveAndNext = () => {
      if (validateFields()) {
        // Save education data to resumeData in local storage
        let resumeData = JSON.parse(localStorage.getItem('resumeData')) || {};

        resumeData.education = educationSection.value;

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
      educationSection,
      educationNameError,
      insituteNameError,
      universityNameError,
      YearOfPassingError,
      percentageError,
      addEducation,
      removeEducation,
      saveAndNext,
      validateEducationName,
      validateInstituteName,
      validateUniversityName,
      validateYearOfPassing,
      validatePercentage,
      required,
    };
  },
};
</script>