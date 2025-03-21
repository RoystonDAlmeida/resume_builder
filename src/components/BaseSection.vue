<template>
    <div class="sections">
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
              @click="handleSaveAndNext"
              :disabled="currentSection >= sectionsLength - 1"
            >
              &gt;
            </button>
          </div>
        </div>
        <slot></slot>
        <button class="next-button" @click="handleSaveAndNext">Next</button>
      </div>
    </div>
</template>
  
<script>
  import { inject } from 'vue';
  import { useSectionNavigation } from '../composables/useSectionNavigation';
  
  export default {
    name: 'BaseSection',
    props: {
      validateFunction: {
        type: Function,
        default: () => true, // Default to true if no validation function is provided
      },
    },
    setup(props) {
      const sectionData = inject('sectionData');
      const { nextSection, previousSection, currentSection, sectionsLength } =
        useSectionNavigation();
  
      const handleSaveAndNext = () => {
        if (!props.validateFunction()) return;
        nextSection();
      };
  
      return {
        sectionData,
        nextSection,
        previousSection,
        currentSection,
        sectionsLength,
        handleSaveAndNext,
      };
    },
  };
</script>  