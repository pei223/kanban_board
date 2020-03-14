<template>
  <v-app>
    <v-app-bar app color="indigo">
      <v-toolbar-title>Kanban board</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-select
          class="project-select-box"
          background-color="transparent"
          :items="items"
          label="プロジェクト"
          solo
          @change="onProjectSelectChanged"
        ></v-select>
        <v-btn text @click="link('/kanban')">
          <span class="app-bar-link">カンバン</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "reflect-metadata"
import ProjectListPresenter from '~/presenter/project_list_presenter'

const ADD_PROJECT_OPTION = "プロジェクトを追加"

export default {
  data() {
    return {
      projectPresenter: new ProjectListPresenter(),
      projects: [],
      items: [ADD_PROJECT_OPTION]
    };
  },
  mounted() {
    this.projectPresenter.read().then((data) => {
      let items = data.map(function(project) {return project.project_name})
      this.projects = data
      this.items = [ADD_PROJECT_OPTION].concat(items)
    })
  },
  methods: {
    link(toLink) {
      this.$router.push(toLink);
    },
    onProjectSelectChanged(selectedProject) {
      if (selectedProject === ADD_PROJECT_OPTION) {
        // TODO プロジェクト追加
      }
      console.log(selectedProject);
    }
  }
};
</script>
<style>
.project-select-box {
  align-items: center;
  width: 300px;
  word-break: break-all;
}

.project-select-box.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
    box-shadow: none !important;
    height: 100%;
    margin-bottom: 0px;
}

.v-input__control > .v-text-field__details {
  display: none;
}


.app-bar-link {
  color: white !important;
  height: 100%;
  font-size: 1.2em;
  text-decoration: none;
}
</style>