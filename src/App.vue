<template>
  <div id="app">
    <ResumeEditor :resume="resume" @update-resume="updateResume" />
    <div ref="resumePreview">
      <ResumePreview :resume="resume" />
    </div>
    <button @click="exportPDF">Export as PDF</button>
  </div>
</template>

<script>
import ResumeEditor from './components/ResumeEditor.vue';
import ResumePreview from './components/ResumePreview.vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  components: { ResumeEditor, ResumePreview },
  
  data() {
    return {
      resume: {
        name: '',
        email: '',
        experience: ''
      }
    };
  },

  methods: {
    updateResume(updatedResume) {
      this.resume = updatedResume;
    },

    exportPDF() {
      const element = this.$refs.resumePreview; // Use ref to get the element
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('resume.pdf');
      }).catch(error => {
        console.error("Error generating PDF:", error);
      });
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
