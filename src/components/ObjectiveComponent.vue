<template>
  <BaseSection :validateFunction="validateObjective">
    <div class="objective-box">
      <div class="textarea-wrapper">
        <textarea
          v-model="objectiveText"
          ref="objectiveTextArea"
          class="objective-textarea"
          placeholder="Highlight your career aspirations and how your skills align with the role."
        >
        </textarea>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </BaseSection>
</template>

<script>
import { ref, inject, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useSectionValidation } from '../composables/useSectionValidation';
import BaseSection from './BaseSection.vue';

export default {
  name: 'ObjectiveComponent',
  components: {
    BaseSection,
  },
  setup() {
    const objectiveText = ref('');
    const resumeData = inject('resumeData');
    const updateTitle = inject('updateTitle');
    const errorMessage = ref(''); // Local errorMessage

    onMounted(() => {
      updateTitle('Resume Builder | Home');
      nextTick(() => {
        objectiveText.value = resumeData.value.objective || '';
      });
    });

    onBeforeUnmount(() => {
      resumeData.value.objective = objectiveText.value;
    });

    const validateObjective = () => {
      if (!objectiveText.value.trim()) {
        errorMessage.value = 'Please provide an objective before proceeding.'; // Update the composable's errorMessage
        return false;
      }
      errorMessage.value = ''; // Clear the error message if validation passes
      return true;
    };

    return {
      objectiveText,
      validateObjective,
      errorMessage
    };
  },
};
</script>