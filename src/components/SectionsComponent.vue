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
        <div
          class="objective-box"
          contenteditable="true"
          @focus="removePlaceholder"
          @blur="handleBlur"
        >
          <span v-if="showPlaceholder" class="objective-placeholder">
            Highlight your career aspirations and how your skills align with the role.
          </span>
          <span v-else ref="objectiveBox">{{ objectiveText }}</span>
        </div>
        <button class="next-button" @click="saveAndNext">Next</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </div>
</template>
  
<script>
import { ref, inject, onMounted, onBeforeUnmount } from 'vue';

  export default {
    name: 'SectionsComponent',

    setup() {
      const objectiveText = ref('');
      const showPlaceholder = ref(true);
      const resumeData = inject('resumeData'); // Access the shared data
      const sectionData = inject('sectionData');
      const nextSection = inject('nextSection'); // Access the nextSection function
      const previousSection = inject('previousSection');
      const currentSection = inject('currentSection'); // inject currentSection
      const sectionsLength = inject('sectionsLength'); // inject sectionsLength
      const errorMessage = ref('');
      const objectiveBox = ref(null); // Ref for contenteditable element

      const removePlaceholder = () => {
        showPlaceholder.value = false;
      };

    const restorePlaceholder = () => {
      if (!objectiveText.value) {
        showPlaceholder.value = true;
      }
    };

    const handleBlur = (event) => {
      objectiveText.value = event.target.textContent;
    };

    onMounted(() => {
      objectiveText.value = resumeData.value.objective || '';
    });

    onBeforeUnmount(() => {
      resumeData.value.objective = objectiveText.value;
    });

    const saveAndNext = () => {
      if (!objectiveText.value.trim()) {
        errorMessage.value = "Please provide an objective before proceeding.";
        return; // Stop navigation
      }

      errorMessage.value = ''; // Clear any previous error
      resumeData.objective = objectiveText.value; // Store in resumeData
      console.log('Resume Data:', resumeData.value);
      nextSection();
    };

    return {
      objectiveText,
      showPlaceholder,
      removePlaceholder,
      restorePlaceholder,
      handleBlur,
      saveAndNext,
      sectionData,
      nextSection,
      previousSection,
      currentSection,
      sectionsLength,
      errorMessage,
      objectiveBox,
    };
    },
  };
</script>