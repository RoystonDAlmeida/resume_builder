<template>
  <div class="sections">
    <div class="resume-title-container">
      <h2 class="resume-title">Craft your winning attractive ATS friendly Resume!</h2>
    </div>
    <div class="sections-container">
      <div class="section-header">
        <h2 class="section-title">Objective</h2>
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
      <div class="objective-box">
        <div class="textarea-wrapper">
          <textarea
            v-model="objectiveText"
            ref="objectiveTextArea"
            class="objective-textarea"
            @input="handleInput"
            @keydown="handleKeyDown"
            placeholder="Highlight your career aspirations and how your skills align with the role."
          >
          </textarea>
        </div>
      </div>
      <button class="next-button" @click="saveAndNext">Next</button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted, onBeforeUnmount, nextTick } from 'vue';

export default {
  name: 'SectionsComponent',

  setup() {
    const objectiveText = ref('');
    const resumeData = inject('resumeData');
    const sectionData = inject('sectionData');
    const nextSection = inject('nextSection');
    const previousSection = inject('previousSection');
    const currentSection = inject('currentSection');
    const sectionsLength = inject('sectionsLength');
    const errorMessage = ref('');
    const objectiveTextArea = ref(null);
    const updateTitle = inject('updateTitle');

    onMounted(() => {
      updateTitle('Resume Builder | Home');
      nextTick(() => {
        objectiveText.value = resumeData.value.objective || '';
      });
    });

    onBeforeUnmount(() => {
      resumeData.value.objective = objectiveText.value;
    });

    const saveAndNext = () => {
      if (!objectiveText.value.trim()) {
        errorMessage.value = 'Please provide an objective before proceeding.';
        return;
      }

      errorMessage.value = '';
      resumeData.value.objective = objectiveText.value;
      console.log('Resume Data:', resumeData.value);
      nextSection();
    };

    return {
      objectiveText,
      saveAndNext,
      sectionData,
      nextSection,
      previousSection,
      currentSection,
      sectionsLength,
      errorMessage,
      objectiveTextArea,
    };
  },
};
</script>