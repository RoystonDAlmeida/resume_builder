<template>
    <div class="sections">
      <div class="work-experience-container">
        <div class="section-header">
          <h2 class="section-title">{{ sectionData.title }}</h2>
          <p class="italic-gray">*Add at most two work experience descriptions</p>
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
  
        <!-- Work Experience Sections (Scrollable Container) -->
        <div class="scrollable-container">
          <div v-for="(experience, index) in workExperiences" :key="index" class="experience-section">
            <div class="experience-header">
              <h4>Work Experience #{{ index + 1 }}</h4>
              <button v-if="index === 1" class="remove-button" @click="removeWorkExperience">
                -
              </button>
            </div>
            <div class="input-row">
              <v-text-field
                v-model="experience.jobTitle"
                label="Job Title"
                :error-messages="jobTitleError[index]"
                @input="validateJobTitle(index)"
              ></v-text-field>
            </div>
  
            <div class="input-row">
              <v-text-field
                v-model="experience.companyName"
                label="Company Name"
                :error-messages="companyNameError[index]"
                @input="validateCompanyName(index)"
              ></v-text-field>
            </div>
  
            <div class="input-row">
              <v-text-field
                v-model="experience.location"
                label="Location (City and State)"
                :error-messages="locationError[index]"
                @input="validateLocation(index)"
              ></v-text-field>
            </div>
  
            <div class="input-row">
              <v-text-field
                v-model="experience.fromDate"
                label="From Date"
                type="date"
                :error-messages="fromDateError[index]"
                @input="validateFromDate(index)"
              ></v-text-field>
            </div>
  
            <div class="checkbox-row">
              <v-checkbox
                v-model="experience.currentlyWorking"
                label="Currently Working"
                color="pink"
                @change="onCurrentlyWorkingChanged(index)"
              ></v-checkbox>
            </div>
  
            <div class="input-row">
              <v-text-field
                v-if="!experience.currentlyWorking"
                v-model="experience.toDate"
                label="To Date"
                type="date"
              ></v-text-field>
            </div>
  
            <v-textarea
              v-model="experience.responsibilities"
              label="Responsibilities"
              :error-messages="responsibilitiesError[index]"
              :rules="[required]"
              :counter="false"
              rows="3"
              @input="validateResponsibilities(index)"
            ></v-textarea>
            <span class="word-limit-notice">{{ experience.responsibilities.length }}/200</span>
          </div>
        </div>
  
        <!-- Add Work Experience Button -->
        <button
          v-if="workExperiences.length < 2"
          class="add-button pink-button"
          @click="addWorkExperience"
        >
          + Add Work Experience
        </button>
  
        <!-- Next Button -->
        <button class="next-button" @click="saveAndNext">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, inject, onMounted } from 'vue';
  
  export default {
    name: 'WorkExperienceComponent',
    setup() {
      const resumeData = inject('resumeData');
      const sectionData = inject('sectionData');
      const nextSection = inject('nextSection');
      const previousSection = inject('previousSection');
      const currentSection = inject('currentSection');
      const sectionsLength = inject('sectionsLength');
      const updateTitle = inject('updateTitle'); 

      onMounted(() => {
        updateTitle('Resume Builder | Work Experience');
      });

      const workExperiences = ref(resumeData.value.workExperience || [
        {
          jobTitle: '',
          companyName: '',
          location: '',
          fromDate: '',
          toDate: '',
          responsibilities: '',
          currentlyWorking: false,
        },
      ]);
  
      // Error messages for validation
      const jobTitleError = ref(['']);
      const companyNameError = ref(['']);
      const locationError = ref(['']);
      const fromDateError = ref(['']);
      const responsibilitiesError = ref(['']);
  
      // Validation rules
      const required = (value) => !!value || 'This field is required';
  
      const addWorkExperience = () => {
        if (workExperiences.value.length < 2) {
          workExperiences.value.push({
            jobTitle: '',
            companyName: '',
            location: '',
            fromDate: '',
            toDate: '',
            responsibilities: '',
            currentlyWorking: false,
          });
  
          // Initialize error arrays for the new experience
          jobTitleError.value.push('');
          companyNameError.value.push('');
          locationError.value.push('');
          fromDateError.value.push('');
          responsibilitiesError.value.push('');
        }
      };
  
      const removeWorkExperience = () => {
        if (workExperiences.value.length > 1) {
          workExperiences.value.pop();
          jobTitleError.value.pop();
          companyNameError.value.pop();
          locationError.value.pop();
          fromDateError.value.pop();
          responsibilitiesError.value.pop();
        }
      };
  
      const validateJobTitle = (index) => {
        if (!workExperiences.value[index].jobTitle) {
          jobTitleError.value[index] = 'Job Title is required';
        } else {
          jobTitleError.value[index] = '';
        }
      };
  
      const validateCompanyName = (index) => {
        if (!workExperiences.value[index].companyName) {
          companyNameError.value[index] = 'Company Name is required';
        } else {
          companyNameError.value[index] = '';
        }
      };
  
      const validateLocation = (index) => {
        if (!workExperiences.value[index].location) {
          locationError.value[index] = 'Location is required';
        } else {
          locationError.value[index] = '';
        }
      };
  
      const validateFromDate = (index) => {
        if (!workExperiences.value[index].fromDate) {
          fromDateError.value[index] = 'From Date is required';
        } else {
          fromDateError.value[index] = '';
        }
      };
  
      const validateResponsibilities = (index) => {
        const maxLength = 200;
        if (workExperiences.value[index].responsibilities.length > maxLength) {
          workExperiences.value[index].responsibilities = workExperiences.value[index].responsibilities.slice(0, maxLength);
          responsibilitiesError.value[index] = 'Responsibilities should not exceed 200 characters';
        } else {
          responsibilitiesError.value[index] = '';
        }
      };
  
      const onCurrentlyWorkingChanged = (index) => {
        if (workExperiences.value[index].currentlyWorking) {
          workExperiences.value[index].toDate = '';
        }
      };
  
      const validateFields = () => {
        let isValid = true;
  
        // Reset error messages
        jobTitleError.value = workExperiences.value.map(() => '');
        companyNameError.value = workExperiences.value.map(() => '');
        locationError.value = workExperiences.value.map(() => '');
        fromDateError.value = workExperiences.value.map(() => '');
        responsibilitiesError.value = workExperiences.value.map(() => '');
  
        workExperiences.value.forEach((experience, index) => {
          validateJobTitle(index);
          validateCompanyName(index);
          validateLocation(index);
          validateFromDate(index);
          validateResponsibilities(index);
  
          if (jobTitleError.value[index] || companyNameError.value[index] || locationError.value[index] || fromDateError.value[index] || responsibilitiesError.value[index]) {
            isValid = false;
          }
        });
  
        return isValid;
      };

      const saveAndNext = () => {
        if (validateFields()) {
          // Save work experience data to resumeData in local storage
          let resumeData = JSON.parse(localStorage.getItem('resumeData')) || {};
  
          resumeData.workExperience = workExperiences.value.map(exp => ({
            ...exp,
            toDate: exp.currentlyWorking ? 'Present' : exp.toDate,
          })); // Store all work experiences
  
          localStorage.setItem('resumeData', JSON.stringify(resumeData));

          // Update the title of the tab
          updateTitle('Resume Builder | Work Experience');

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
        workExperiences,
        jobTitleError,
        companyNameError,
        locationError,
        fromDateError,
        responsibilitiesError,
        addWorkExperience,
        removeWorkExperience,
        saveAndNext,
        validateJobTitle,
        validateCompanyName,
        validateLocation,
        validateFromDate,
        validateResponsibilities,
        onCurrentlyWorkingChanged,
        required,
      };
    },
  };
  </script>