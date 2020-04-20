<template>
  <v-layout column justify-center align-center>
    <v-container x12 sm10 md10>
      <h2>{{ projectState.selected_name }} スプリント一覧</h2>
      <v-card width="100%">
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
      items: [],
    }
  },
  beforeMount() {
    new ProjectPresenter().selectProject(this.projectId)
    this.presenter.read(this.projectId).then((data) => {
      this.items = data;
    }).catch((error) => {
        this.items = []
    })
  },
  methods: {
    link(path) {
      this.$parent.$router.push(path);
    }
  }
}
</script>
