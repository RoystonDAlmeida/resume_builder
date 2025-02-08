<template>
    <div class="sections">
      <div class="resume-title-container">
        <h2 class="resume-title">Craft your winning attractive ATS friendly Resume!</h2>
      </div>
      <div class="sections-container">
        <div class="section-header">
          <h2 class="section-title">Objective</h2>
          <div class="arrow-container">
            <button class="nav-arrow" :disabled="true">
              &lt;
            </button>
            <div class="section-number-bubble">1</div>
            <button class="nav-arrow" :disabled="true">
              &gt;
            </button>
          </div>
        </div>
        <div
          class="objective-box"
          contenteditable="true"
          @focus="removePlaceholder"
          @blur="restorePlaceholder"
        >
          <span v-if="showPlaceholder" class="objective-placeholder">
            Highlight your career aspirations and how your skills align with the role.
          </span>
          <span v-else v-html="objectiveText"></span>
        </div>
        <button class="next-button">Next</button>
      </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';

  export default {
    name: 'SectionsComponent',
    setup() {
      const objectiveText = ref('');
    const showPlaceholder = ref(true);

    const removePlaceholder = () => {
      showPlaceholder.value = false;
    };

    const restorePlaceholder = () => {
      if (!objectiveText.value) {
        showPlaceholder.value = true;
      }
    };

    return {
      objectiveText,
      showPlaceholder,
      removePlaceholder,
      restorePlaceholder,
    };
    },
  };
</script>