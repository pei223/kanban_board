<template>
  <v-app>
    <v-navigation-drawer
      v-model="isDrawerOpen"
      absolute
      temporary>
      <SideBar />
    </v-navigation-drawer>
    <Header 
      :projects="projectState.projects"
      :on-selected="onProjectSelectChanged"
      :on-link-clicked="link"
      :on-menu-clicked="() => isDrawerOpen = !isDrawerOpen"
      :selected_project_id="projectState.selected_id" />
    <v-content>
      <v-container>
        <nuxt :key="$route.fullPath" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "reflect-metadata"
import ProjectPresenter from '~/presenter/project_presenter'
import projectStore from '../store/project_store'
import Header from './header'
import SideBar from './sidebar'

export default {
  data() {
    return {
      isDrawerOpen: false,
      projectPresenter: new ProjectPresenter(),
      projectState: projectStore.state,
    };
  },
  mounted() {
    this.projectPresenter.read()
  },
  components: {
    SideBar,
    Header
  },
  methods: {
    link(toLink) {
      this.$parent.$router.push(toLink);
    },
    onProjectSelectChanged(selectedProject) {
      this.projectPresenter.selectProject(parseInt(selectedProject))
      this.$parent.$router.push(`/backlog/${projectStore.state.selected_id}?sprint_id=active`);
    },
  }
};
</script>
