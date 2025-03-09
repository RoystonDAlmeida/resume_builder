<template>
  <div class="sections">
    <div class="resume-title-container">
      <h2 class="resume-title">Craft your winning attractive ATS friendly Resume!</h2>
    </div>
    <div class="sections-container">
      <div class="section-header">
        <h2 class="section-title">{{ sectionData.title }}</h2>
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

      <!-- Fields Layout -->
      <div class="input-row">
        <v-text-field
          v-model="resumeData.fullName"
          label="Full Name"
          :error-messages="fullNameError"
          @input="validateFullName"
        ></v-text-field>
        <v-text-field
          v-model="resumeData.phoneNumber"
          label="Phone Number"
          :error-messages="phoneNumberError"
          @input="validatePhoneNumber"
        ></v-text-field>
      </div>

      <v-text-field
        v-model="resumeData.email"
        label="Email"
        :error-messages="emailError"
        @input="validateEmail"
      ></v-text-field>

      <v-text-field
        v-model="resumeData.linkedin"
        label="LinkedIn Profile URL"
        :error-messages="linkedinError"
        @input="validateLinkedIn"
      ></v-text-field>

      <button class="next-button" @click="saveAndNext">Next</button>
    </div>
  </div>
</template>

<script>
import { inject, ref, onMounted } from 'vue';

export default {
  name: 'ContactInfoComponent',
  setup() {
    const resumeData = inject('resumeData');
    const sectionData = inject('sectionData');
    const nextSection = inject('nextSection');
    const previousSection = inject('previousSection');
    const currentSection = inject('currentSection');
    const sectionsLength = inject('sectionsLength');
    const updateTitle = inject('updateTitle'); 

    onMounted(() => {
      updateTitle('Resume Builder | Contact Info');
    });

    // Error messages for validation
    const fullNameError = ref('');
    const phoneNumberError = ref('');
    const emailError = ref('');
    const linkedinError = ref('');

    const validateFullName = () => {
      if (!resumeData.value.fullName) {
        fullNameError.value = 'Full Name is required';
      } else {
        fullNameError.value = '';
      }
    };

    const validatePhoneNumber = () => {
      const phoneRegex = /^\d{10}$/;
      if (!resumeData.value.phoneNumber) {
        phoneNumberError.value = 'Phone Number is required';
      } else if (!phoneRegex.test(resumeData.value.phoneNumber)) {
        phoneNumberError.value = 'Invalid Phone Number format';
      } else {
        phoneNumberError.value = '';
      }
    };

    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!resumeData.value.email) {
        emailError.value = 'Email is required';
      } else if (!emailRegex.test(resumeData.value.email)) {
        emailError.value = 'Invalid Email format';
      } else {
        emailError.value = '';
      }
    };

    const validateLinkedIn = () => {
      const linkedinRegex = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/;
      if (!resumeData.value.linkedin) {
        linkedinError.value = 'LinkedIn Profile URL is required';
      } else if (!linkedinRegex.test(resumeData.value.linkedin)) {
        linkedinError.value = 'Invalid LinkedIn Profile URL format';
      } else {
        linkedinError.value = '';
      }
    };

    const validateFields = () => {
      validateFullName();
      validatePhoneNumber();
      validateEmail();
      validateLinkedIn();

      return (
        !fullNameError.value &&
        !phoneNumberError.value &&
        !emailError.value &&
        !linkedinError.value
      );
    };

    const saveAndNext = () => {
      if (validateFields()) {
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
      saveAndNext,
      fullNameError,
      phoneNumberError,
      emailError,
      linkedinError,
      validateFullName,
      validatePhoneNumber,
      validateEmail,
      validateLinkedIn,
    };
  },
};
</script>
