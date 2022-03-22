<template>
  <div v-if="currentSample" class=" edit-form">
    <h4>Sample</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentSample.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentSample.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentSample.published ? "Published" : "Pending" }}
      </div>
    </form>
    <button class="badge badge-primary mr-2"
      v-if="currentSample.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2"
      @click="deleteSample"
    >
      Delete
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateSample"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Sample...</p>
  </div>
</template>
<script>
import SampleDataService from "../services/SampleDataService";
export default {
  name: "sample",
  data() {
    return {
      currentSample: null,
      message: ''
    };
  },
  methods: {
    getSample(id) {
      SampleDataService.get(id)
        .then(response => {
          this.currentSample = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentSample.id,
        title: this.currentSample.title,
        description: this.currentSample.description,
        published: status
      };
      SampleDataService.update(this.currentSample.id, data)
        .then(response => {
          this.currentSample.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateSample() {
      SampleDataService.update(this.currentSample.id, this.currentSample)
        .then(response => {
          console.log(response.data);
          this.message = 'The sample was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteSample() {
      SampleDataService.delete(this.currentSample.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "samples" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getSample(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>