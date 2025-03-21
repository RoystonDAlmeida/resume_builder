<template>
  <BaseSection :validateFunction="validateFields">
    <div class="scrollable-container">
      <!-- Fields Layout -->
      <div class="input-row">
        <v-text-field
          v-model="fullName"
          label="Full Name"
          :error-messages="fullNameError"
          @input="validateFullName"
        ></v-text-field>

        <v-text-field
          v-model="phoneNumber"
          label="Phone Number"
          :error-messages="phoneNumberError"
          @input="validatePhoneNumber"
        ></v-text-field>
      </div>

      <v-text-field
        v-model="location"
        label="Location"
        :error-messages="locationError"
        @input="validateLocation"
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="Email"
        :error-messages="emailError"
        @input="validateEmail"
      ></v-text-field>

      <v-text-field
        v-model="linkedin"
        label="LinkedIn Profile URL"
        :error-messages="linkedinError"
        @input="validateLinkedIn"
      ></v-text-field>
    </div>
  </BaseSection>
</template>

<script>
import { inject, ref, onMounted } from 'vue';
import BaseSection from './BaseSection.vue';
import { useFieldValidation } from '../composables/useFieldValidation';
import { useDataPersistence } from '../composables/useDataPersistence';
import { useSectionValidation } from '../composables/useSectionValidation';

export default {
  name: 'ContactInfoComponent',
  components: {
    BaseSection,
  },
  setup() {
    const resumeData = inject('resumeData');
    const updateTitle = inject('updateTitle');
    const { validate } = useSectionValidation();

    onMounted(() => {
      updateTitle('Resume Builder | Contact Info');
    });

    // Initialise empty values for model attributes
    const fullName = ref('');
    const phoneNumber = ref('');
    const location = ref('');
    const email = ref('');
    const linkedin = ref('');

    // Error messages for validation
    const fullNameError = ref('');
    const phoneNumberError = ref('');
    const locationError = ref('');
    const emailError = ref('');
    const linkedinError = ref('');

    const { validateField } = useFieldValidation();

    const validateFullName = () =>
      validateField(fullName, fullNameError, 'Full Name is required');
    const validatePhoneNumber = () =>
      validateField(
        phoneNumber,
        phoneNumberError,
        'Phone Number is required',
        /^\d{10}$/,
        'Invalid Phone Number format'
      );
    const validateLocation = () =>
      validateField(location, locationError, 'Location is required');
    const validateEmail = () =>
      validateField(
        email,
        emailError,
        'Email is required',
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Invalid Email format'
      );
    const validateLinkedIn = () =>
      validateField(
        linkedin,
        linkedinError,
        'LinkedIn Profile URL is required',
        /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/,
        'Invalid LinkedIn Profile URL format'
      );

    const validateFields = () => {
      validateFullName();
      validatePhoneNumber();
      validateLocation();
      validateEmail();
      validateLinkedIn();

      return (
        !fullNameError.value &&
        !phoneNumberError.value &&
        !locationError.value &&
        !emailError.value &&
        !linkedinError.value
      );
    };

    useDataPersistence(resumeData, {
      fullName,
      phoneNumber,
      location,
      email,
      linkedin,
    });

    return {
      fullName,
      phoneNumber,
      location,
      email,
      linkedin,
      fullNameError,
      phoneNumberError,
      locationError,
      emailError,
      linkedinError,
      validateFullName,
      validatePhoneNumber,
      validateLocation,
      validateEmail,
      validateLinkedIn,
      validateFields,
    };
  },
};
</script>