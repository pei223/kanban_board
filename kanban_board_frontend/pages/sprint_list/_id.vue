<template>
  <v-layout column justify-center align-center>
    <v-container x12 sm10 md10>
      <h2>{{ projectState.selected_name }} スプリント一覧</h2>
      <v-card width="100%">
        <v-card-title v-if="items === null"></v-card-title>
        <v-card-title v-else-if="items.length === 0">スプリントはありません</v-card-title>
        <v-list>
          <template v-for="(item, index) in items">
            <SprintRow :key=index :item=item />
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
        @click="link('/sprint/new/')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-progress-circular
      v-model="show_progress"
      v-if="show_progress"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-layout>
</template>

<script>
import SprintPresenter from '~/presenter/sprint_presenter'
import ProjectPresenter from '~/presenter/project_presenter'
import projectStore from '../../store/project_store'
import SprintRow from "~/components/sprint_row"


export default {
  components: {
    SprintRow,
  },
  data() {
    return {
      projectId: this.$route.params.id,
      presenter: new SprintPresenter(),
      projectState: projectStore.state,
      show_progress: true,
      items: null,
    }
  },
  beforeMount() {
    new ProjectPresenter().selectProject(this.projectId)
    this.presenter.read(this.projectId).then((data) => {
      this.show_progress = false
      this.items = data;
    }).catch((error) => {
        this.items = []
        this.show_progress = false
    })
  },
  methods: {
    link(path) {
      this.$parent.$router.push(path);
    }
  }
}
</script>
