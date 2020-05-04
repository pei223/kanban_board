<template>
  <v-layout column justify-center align-center>
    <v-container x12 sm10 md10>
      <h2>プロジェクト一覧</h2>
      <v-card width="100%">
        <v-list>
          <template v-for="(item, index) in sharedState.projects">
            <ProjectRow :key=index :item=item />
          </template>
        </v-list>
      </v-card>
    </v-container>
    
    <v-fab-transition>
      <v-btn
        color="red"
        dark
        fixed
        bottom
        right
        fab
        @click="link('/project/new/')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-layout>
</template>

<script>
import ProjectRow from "~/components/project_row"
import ProjectPresenter from '~/presenter/project_presenter'
import projectStore from '../store/project_store'


export default {
  components: {
    ProjectRow,
  },
  data() {
    return {
      presenter: new ProjectPresenter(),
      sharedState: projectStore.state,
    }
  },
  beforeMount() {
    this.presenter.read();
  },
  methods: {
    link(path) {
      this.$parent.$router.push(path);
    }
  }
}
</script>
