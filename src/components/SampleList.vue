<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Samples List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(sample, index) in samples"
          :key="index"
          @click="setActiveSample(sample, index)"
        >
          {{ sample.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllSamples">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentSample">
        <h4>Sample</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentSample.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentSample.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentSample.published ? "Published" : "Pending" }}
        </div>
        <a class="badge badge-warning"
          :href="'/samples/' + currentSample.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Sample...</p>
      </div>
    </div>
  </div>
</template>
<script>
import SampleDataService from "../services/SampleDataService";
export default {
  name: "samples-list",
  data() {
    return {
      samples: [],
      currentSample: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveSamples() {
      SampleDataService.getAll()
        .then(response => {
          this.samples = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveSamples();
      this.currentSample = null;
      this.currentIndex = -1;
    },
    setActiveSample(sample, index) {
      this.currentSample = sample;
      this.currentIndex = index;
    },
    removeAllSamples() {
      SampleDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      SampleDataService.findByTitle(this.title)
        .then(response => {
          this.samples = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveSamples();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>