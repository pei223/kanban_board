<template>
    <v-app-bar app color="indigo">
      <v-toolbar-title>Kanban board</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-select
          v-model="selected_project_id"
          class="project-select-box"
          background-color="transparent"
          :items="projects"
          item-text="project_name"
          item-value="id"
          label="プロジェクト"
          solo
          @change="onSelected"
        ></v-select>
      </v-toolbar-items>
    </v-app-bar>
</template>
<script>
export default {
    props: {
        projects: Array,
        onSelected: Function,
        onLinkClicked: Function,
        selected_project_id: Number,
    },
}
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