<template>
    <div>
      <div v-if="values.loading" class="progress-box">
        <v-progress-circular
          :size="70"
          :width="7"
          color="white"
          indeterminate
          style="vertical-align: middle"
        ></v-progress-circular>
      </div>
      <v-layout v-else column justify-center align-center v-model="ticket">
      <v-container xs12 sm10 md10>
        <v-card width="100%" color="white">
          <v-card-title style="color: black"> {{ values.ticket.title }}</v-card-title>
        </v-card>
      </v-container>
    </v-layout>
    <div v-if="values.failed">
      <p>データの読み込みに失敗しました</p>
    </div>
  </div>
</template>

<script>
import "reflect-metadata";
import BacklogPresenter from "~/presenter/backlog_presenter";

export default {
  data() {
    return {
      id: this.$route.params.id,
      presenter: new BacklogPresenter(),
      values: {
          ticket: null,
          loading: true,
          failed: false,
      },
    };
  },
  beforeMount() {
    if (this.id === "new") {  // 新規チケット
      this.$set(this.values, "loading", false)
      this.$set(this.values, "ticket", {title: ""})
      return;
    }
    this.presenter.find(parseInt(this.id)).then((data) => {
      this.$set(this.values, "ticket", data)
      this.$set(this.values, "loading", false)
    })
  },
  methods: {}
};
</script>

<style>
.progress-box {
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>