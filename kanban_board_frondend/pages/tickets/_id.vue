<template>
  <div>
    <div v-if="values.ticket === null">
      <div v-if="values.failedLoad">
        <p>データの読み込みに失敗しました</p>
      </div>
      <div v-else class="progress-box">
        <v-progress-circular
          :size="70"
          :width="7"
          color="white"
          indeterminate
          style="vertical-align: middle"
        ></v-progress-circular>
      </div>
    </div>
    <v-layout v-else column justify-center align-center v-model="ticket">
      <v-container xs12 sm10 md10>
        <v-card width="100%" color="white">
          <v-card-title style="color: black"> {{ values.ticket.title }}</v-card-title>
        </v-card>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import "reflect-metadata";
import KanbanDetailPresenter from "~/presenter/kanban_detail_presenter";

export default {
  data() {
    return {
      id: this.$route.params.id,
      presenter: new KanbanDetailPresenter(),
      values: {
          ticket: null,
          failedLoad: false
      },
    };
  },

  beforeMount() {
      this.$set(this.values, "ticket", this.presenter.findDetail(parseInt(this.id)))
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