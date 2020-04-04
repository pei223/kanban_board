<template>
  <v-app>
    <Header :projects="sharedState.projects" :on-selected="onProjectSelectChanged" :on-link-clicked="link" />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "reflect-metadata"
import ProjectPresenter from '~/presenter/project_presenter'
import projectStore from '../store/project_store'
import Header from './header'

export default {
  data() {
    return {
      projectPresenter: new ProjectPresenter(),
      sharedState: projectStore.state,
    };
  },
  mounted() {
    this.projectPresenter.read()
  },
  components: {
    Header
  },
  methods: {
    link(toLink) {
      this.$parent.$router.push(toLink);
    },
    onProjectSelectChanged(selectedProject) {
      console.log(selectedProject);
    },
  }
};
</script>
