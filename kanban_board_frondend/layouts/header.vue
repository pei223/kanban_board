<template>
    <v-app-bar app color="indigo">
      <v-toolbar-title>Kanban board</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-select
          class="project-select-box"
          background-color="transparent"
          :items="projects"
          item-text="project_name"
          item-value="id"
          label="プロジェクト"
          solo
          @change="onSelected"
        ></v-select>
        <v-btn text @click.native="onLinkClicked('/kanban');">
          <span class="app-bar-link">カンバン</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
</template>
<script>
export default {
    props: {
        projects: Array,
        onSelected: Function,
        onLinkClicked: Function
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