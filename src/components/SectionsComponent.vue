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
          @input="handleInput"
        >
          <span v-if="showPlaceholder" class="objective-placeholder">
            Highlight your career aspirations and how your skills align with the role.
          </span>
          <span v-else ref="objectiveBox">{{ objectiveText }}</span>
          <!-- Display predicted word if available -->
          <span v-if="predictedWord" class="predicted-word">{{ predictedWord }}</span>
        </div>
        <button class="next-button" @click="saveAndNext">Next</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </div>
</template>
  
<script>
import { ref, inject, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { debounce } from 'lodash';

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
      const predictedWord = ref('');
      const API_URL = 'http://localhost:5000/predict';
      const updateTitle = inject('updateTitle'); 

      const predictNextWord = async (text) => {
      try {
        
        const response = await axios.post(API_URL, { text: text });

        // console.log('API Response:', response); // Debugging

        if (response.data.predictions && response.data.predictions.length > 0) {
          predictedWord.value = response.data.predictions[0];
        } else {
          predictedWord.value = '';
        }
      } catch (error) {
        console.error('Error fetching predictions:', error);
        errorMessage.value = 'Failed to get word predictions.';
        predictedWord.value = '';
      }
    };

    const debouncedPredict = debounce((text) => {
      predictNextWord(text);
    }, 300);

    const handleInput = (event) => {
      objectiveText.value = event.target.innerText; // Set the objectiveText to what is being typed

      if (event.target.innerHTML.includes('&nbsp;')) {
        // If a space is detected, it will be present in innerHTML
        debouncedPredict(objectiveText.value);
      } else {
        predictedWord.value = ''; // Clear prediction if not a space
      }

      // Handle empty content case
      if (!objectiveText.value) {
        showPlaceholder.value = true; // Show placeholder if empty
      }
    };

    const insertPredictedWord = () => {
      if (predictedWord.value) {
        objectiveText.value += `${predictedWord.value} `; // Append predicted word
        predictedWord.value = ''; // Clear prediction after insertion
      }
    };

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
      updateTitle('Resume Builder | Home');
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
      resumeData.value.objective = objectiveText.value; // Store in resumeData
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
      predictedWord,
      handleInput,
      insertPredictedWord,
    };
    },
  };
</script>