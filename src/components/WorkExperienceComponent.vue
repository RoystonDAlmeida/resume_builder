<template>
  <BaseSection :validateFunction="validateFields">
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
            @blur="validateJobTitle(index)"
            @input="clearJobTitleError(index)"
          ></v-text-field>
        </div>

        <div class="input-row">
          <v-text-field
            v-model="experience.companyName"
            label="Company Name"
            :error-messages="companyNameError[index]"
            @blur="validateCompanyName(index)"
            @input="clearCompanyNameError(index)"
          ></v-text-field>
        </div>

        <div class="input-row">
          <v-text-field
            v-model="experience.location"
            label="Location (City and State)"
            :error-messages="locationError[index]"
            @blur="validateLocation(index)"
            @input="clearLocationError(index)"
          ></v-text-field>
        </div>

        <div class="input-row">
          <v-text-field
            v-model="experience.fromDate"
            label="From Date"
            type="date"
            :error-messages="fromDateError[index]"
            @blur="validateFromDate(index)"
            @input="clearFromDateError(index)"
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
          @blur="validateResponsibilities(index)"
          @input="clearResponsibilitiesError(index)"
        ></v-textarea>
        <span class="word-limit-notice">{{ experience.responsibilities.length }}/500</span>
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
  </BaseSection>
</template>

<script>
import { ref, inject, onMounted } from 'vue';
import BaseSection from './BaseSection.vue';
import { useFieldValidation } from '../composables/useFieldValidation';
import { useDataPersistence } from '../composables/useDataPersistence';
import { useDynamicFields } from '../composables/useDynamicFields';
import { useCurrentlyWorking } from '../composables/useCurrentlyWorking';
import { useSectionValidation } from '../composables/useSectionValidation';

export default {
  name: 'WorkExperienceComponent',
  components: {
    BaseSection,
  },
  setup() {
    const resumeData = inject('resumeData');
    const updateTitle = inject('updateTitle');
    const { validate } = useSectionValidation();

    onMounted(() => {
      updateTitle('Resume Builder | Work Experience');
    });

    const {
      workExperiences,
      addWorkExperience,
      removeWorkExperience,
    } = useDynamicFields(resumeData, 'workExperiences', {
      jobTitle: '',
      companyName: '',
      location: '',
      fromDate: '',
      toDate: '',
      responsibilities: '',
      currentlyWorking: false,
    });

    // Error messages for validation
    const jobTitleError = ref(workExperiences.value.map(() => ''));
    const companyNameError = ref(workExperiences.value.map(() => ''));
    const locationError = ref(workExperiences.value.map(() => ''));
    const fromDateError = ref(workExperiences.value.map(() => ''));
    const responsibilitiesError = ref(workExperiences.value.map(() => ''));

    // Validation rules
    const required = (value) => !!value || 'This field is required';

    const { validateField } = useFieldValidation();

    const validateJobTitle = (index) =>
      validateField(workExperiences.value[index].jobTitle, jobTitleError.value, 'Job Title is required', null, null, index);
    const validateCompanyName = (index) =>
      validateField(workExperiences.value[index].companyName, companyNameError.value, 'Company Name is required', null, null, index);
    const validateLocation = (index) =>
      validateField(workExperiences.value[index].location, locationError.value, 'Location is required', null, null, index);
    const validateFromDate = (index) =>
      validateField(workExperiences.value[index].fromDate, fromDateError.value, 'From Date is required', null, null, index);
    const validateResponsibilities = (index) => {
      const maxLength = 500;
      if (workExperiences.value[index].responsibilities.length > maxLength) {
        workExperiences.value[index].responsibilities = workExperiences.value[index].responsibilities.slice(0, maxLength);
        responsibilitiesError.value[index] = 'Responsibilities should not exceed 500 characters';
        return false;
      } else {
        responsibilitiesError.value[index] = '';
        return true;
      }
    };

    const { onCurrentlyWorkingChanged } = useCurrentlyWorking(workExperiences);

    const validateFields = () => {
      let isValid = true;

      // Reset error messages
      jobTitleError.value = workExperiences.value.map(() => '');
      companyNameError.value = workExperiences.value.map(() => '');
      locationError.value = workExperiences.value.map(() => '');
      fromDateError.value = workExperiences.value.map(() => '');
      responsibilitiesError.value = workExperiences.value.map(() => '');

      workExperiences.value.forEach((experience, index) => {
        if (!validateJobTitle(index)) isValid = false;
        if (!validateCompanyName(index)) isValid = false;
        if (!validateLocation(index)) isValid = false;
        if (!validateFromDate(index)) isValid = false;
        if (!validateResponsibilities(index)) isValid = false;
      });

      return isValid;
    };
  
      // Methods to clear error messages
      const clearJobTitleError = (index) => {
      jobTitleError.value[index] = '';
    };
    const clearCompanyNameError = (index) => {
      companyNameError.value[index] = '';
    };
    const clearLocationError = (index) => {
      locationError.value[index] = '';
    };
    const clearFromDateError = (index) => {
      fromDateError.value[index] = '';
    };
    const clearResponsibilitiesError = (index) => {
      responsibilitiesError.value[index] = '';
    };

    useDataPersistence(resumeData, { workExperiences });

    return {
      workExperiences,
      jobTitleError,
      companyNameError,
      locationError,
      fromDateError,
      responsibilitiesError,
      addWorkExperience,
      removeWorkExperience,
      validateJobTitle,
      validateCompanyName,
      validateLocation,
      validateFromDate,
      validateResponsibilities,
      onCurrentlyWorkingChanged,
      required,
      validateFields,
      clearJobTitleError,
      clearCompanyNameError,
      clearLocationError,
      clearFromDateError,
      clearResponsibilitiesError,
    };
  },
};
</script>
