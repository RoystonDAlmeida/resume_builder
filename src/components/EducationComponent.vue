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
            @click="saveAndNext"
            :disabled="currentSection >= sectionsLength - 1"
          >
            &gt;
          </button>
        </div>
      </div>

      <!-- Education Section (Scrollable Container) -->
      <div class="scrollable-container">
        <div
          v-for="(education, index) in educationSection"
          :key="index"
          class="education-section"
        >
          <div class="education-header">
            <h4>Education #{{ index + 1 }}</h4>
            <button v-if="index > 0" class="remove-button" @click="removeEducation(index)">
              -
            </button>
          </div>
          <div class="input-row">
            <v-text-field
              v-model="education.name"
              label="Degree/PUC/SSLC, Location(eg: BE in Computer Science/PUC/AISSCE(Class 12), Udipi)"
              :error-messages="educationNameError[index]"
              @blur="validateEducationName(index)"
              @input="clearEducationNameError(index)"
            ></v-text-field>
          </div>

          <div class="input-row">
            <v-text-field
              v-model="education.insituteName"
              label="Institute / School"
              :error-messages="insituteNameError[index]"
              @blur="validateInstituteName(index)"
              @input="clearInstituteNameError(index)"
            ></v-text-field>
          </div>

          <div class="input-row">
            <v-text-field
              v-model="education.universityName"
              label="University / Board"
              :error-messages="universityNameError[index]"
              @blur="validateUniversityName(index)"
              @input="clearUniversityNameError(index)"
            ></v-text-field>
          </div>

          <div class="input-row">
            <v-text-field
              v-model="education.YearOfPassing"
              label="Date of Passing"
              type="date"
              :error-messages="YearOfPassingError[index]"
              @blur="validateYearOfPassing(index)"
              @input="clearYearOfPassingError(index)"
            ></v-text-field>
          </div>

          <div class="input-row">
            <v-text-field
              v-model="education.percentage"
              label="Percentage / GPA"
              :error-messages="percentageError[index]"
              @blur="validatePercentage(index)"
              @input="clearPercentageError(index)"
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
import { ref, inject, onMounted, nextTick } from 'vue';
import { useFieldValidation } from '../composables/useFieldValidation';
import { useDataPersistence } from '../composables/useDataPersistence';

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

    // Define education data
    const educationSection = ref([]);

    // Error messages for validation
    const educationNameError = ref([]);
    const insituteNameError = ref([]);
    const universityNameError = ref([]);
    const YearOfPassingError = ref([]);
    const percentageError = ref([]);

    const { validateField } = useFieldValidation();

    onMounted(() => {
      updateTitle('Resume Builder | Education');

       educationSection.value = [{
              name: '',
              insituteName: '',
              universityName: '',
              YearOfPassing: '',
              percentage: '',
            }];
            
      // Load education data from localStorage
      const storedResumeData =
        JSON.parse(localStorage.getItem('resumeData')) || {};

         educationNameError.value = educationSection.value.map(() => '');
          insituteNameError.value = educationSection.value.map(() => '');
          universityNameError.value = educationSection.value.map(() => '');
          YearOfPassingError.value = educationSection.value.map(() => '');
          percentageError.value = educationSection.value.map(() => '');

      if (storedResumeData.educationSection) {
        educationSection.value = storedResumeData.educationSection;
         educationNameError.value = educationSection.value.map(() => '');
          insituteNameError.value = educationSection.value.map(() => '');
          universityNameError.value = educationSection.value.map(() => '');
          YearOfPassingError.value = educationSection.value.map(() => '');
          percentageError.value = educationSection.value.map(() => '');
      }
    });

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

    const removeEducation = (index) => {
      educationSection.value.splice(index, 1);
      educationNameError.value.splice(index, 1);
      insituteNameError.value.splice(index, 1);
      universityNameError.value.splice(index, 1);
      YearOfPassingError.value.splice(index, 1);
      percentageError.value.splice(index, 1);
    };

    const validateEducationName = (index) =>
      validateField(
        educationSection.value[index].name,
        educationNameError,
        'Degree/PUC/SSLC, Location is required',
        null,
        null,
        index
      );

    const validateInstituteName = (index) =>
      validateField(
        educationSection.value[index].insituteName,
        insituteNameError,
        'Institute / School is required',
        null,
        null,
        index
      );

    const validateUniversityName = (index) =>
      validateField(
        educationSection.value[index].universityName,
        universityNameError,
        'University / Board is required',
        null,
        null,
        index
      );

    const validateYearOfPassing = (index) =>
      validateField(
        educationSection.value[index].YearOfPassing,
        YearOfPassingError,
        'Year of Passing is required',
        null,
        null,
        index
      );

    const validatePercentage = (index) => {
      const percentage = educationSection.value[index].percentage;

      if (!percentage) {
        percentageError.value[index] = 'Percentage is required';
        return false;
      } else {
        const numericValue = parseFloat(percentage);

        if (isNaN(numericValue)) {
          percentageError.value[index] =
            'Invalid input. Please enter a valid number.';
          return false;
        } else if (numericValue < 0.0 || numericValue > 100.0) {
          percentageError.value[index] =
            'Percentage / CGPA must be between 0.0 and 100.0';
          return false;
        } else {
          percentageError.value[index] = '';
          return true;
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
        if (!validateEducationName(index)) isValid = false;
        if (!validateInstituteName(index)) isValid = false;
        if (!validateUniversityName(index)) isValid = false;
        if (!validateYearOfPassing(index)) isValid = false;
        if (!validatePercentage(index)) isValid = false;
      });

      return isValid;
    };

    const saveAndNext = () => {
      if (validateFields()) {
        // Save education data to resumeData in local storage
        let resumeData = JSON.parse(localStorage.getItem('resumeData')) || {};

        resumeData.educationSection = educationSection.value;

        localStorage.setItem('resumeData', JSON.stringify(resumeData));

        nextSection();
      }
    };

    // Methods to clear error messages
    const clearEducationNameError = (index) => {
      educationNameError.value[index] = '';
    };
    const clearInstituteNameError = (index) => {
      insituteNameError.value[index] = '';
    };
    const clearUniversityNameError = (index) => {
      universityNameError.value[index] = '';
    };
    const clearYearOfPassingError = (index) => {
      YearOfPassingError.value[index] = '';
    };
    const clearPercentageError = (index) => {
      percentageError.value[index] = '';
    };

    useDataPersistence(resumeData, { educationSection });

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
      clearEducationNameError,
      clearInstituteNameError,
      clearUniversityNameError,
      clearYearOfPassingError,
      clearPercentageError,
    };
  },
};
</script>
