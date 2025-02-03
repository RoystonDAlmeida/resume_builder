<template>
    <div class="resume-preview">
      <h1>{{ resume.name }}</h1>
      <p>Email: {{ resume.email }}</p>
      <h2>Experience</h2>
      <p>{{ resume.experience }}</p>
    </div>
</template>
  
<script>
  export default {
    props: ['resume']
  }
</script>
  
<style scoped>
  .resume-preview {
    border: 1px solid #ccc;
    padding: 20px;
  }
</style>
  