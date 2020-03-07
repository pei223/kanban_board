<template>
  <v-app>
    <v-app-bar app color="indigo">
      <v-toolbar-title>Kanban board</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="link('/project')">
          <span class="app-bar-link">プロジェクト</span>
        </v-btn>
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
export default {
  data() {
    return {};
  },
  methods: {
    link(toLink) {
      this.$router.push(toLink);
    }
  }
};
</script>
<style>
.app-bar-link {
    color: white !important;
    height: 100%;
    font-size: 1.2em;
    text-decoration: none;
}
</style>