<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="sample.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="sample.description"
          name="description"
        />
      </div>
      <button @click="saveSample" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newSample">Add</button>
    </div>
  </div>
</template>
<script>
import SampleDataService from "../services/SampleDataService";
export default {
  name: "add-sample",
  data() {
    return {
      sample: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveSample() {
      var data = { 
        title: this.sample.title,
        description: this.sample.description
      };
      SampleDataService.create(data)
        .then(response => {
          this.sample.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newSample() {
      this.submitted = false;
      this.sample = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>