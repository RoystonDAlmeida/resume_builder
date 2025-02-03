<template>
    <div>
      <h2>Edit Your Resume</h2>
      <form @submit.prevent="updateResume">
        <label for="name">Name:</label>
        <input type="text" v-model="localResume.name" />
  
        <label for="email">Email:</label>
        <input type="email" v-model="localResume.email" />
  
        <label for="experience">Experience:</label>
        <textarea v-model="localResume.experience"></textarea>
  
        <button type="submit">Update Resume</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['resume'],
    data() {
      return {
        localResume: { ...this.resume } // Create a local copy of the resume prop
      };
    },
    methods: {
      updateResume() {
        this.$emit('update-resume', this.localResume); // Emit the updated local resume
      }
    },
    watch: {
      resume: {
        handler(newValue) {
          this.localResume = { ...newValue }; // Update local copy when prop changes
        },
        deep: true // Watch deeply for nested changes
      }
    }
  }
</script>
  
<style scoped>
  /* Add your styles here */
</style>
  