<template>
  <v-layout column justify-center align-center>
    <v-container xs12 sm10 md10>
      <h2 style="margin-bottom: 20px">{{ project_name }}</h2>
      <v-card width="100%">
        <v-card-title v-if="items === null"></v-card-title>
        <v-card-title v-else-if="items.length === 0">アクティブなスプリントはありません</v-card-title>
        <v-card-title v-else>{{ sprint_name }}</v-card-title>
        <v-list>
            <template v-for="(item, index) in items">
                <TicketRow v-bind:key=index v-bind:item=item />
            </template>
        </v-list>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import "reflect-metadata"
import BacklogPresenter from '~/presenter/backlog_presenter'
import ProjectPresenter from '~/presenter/project_presenter'
import TicketRow from "~/components/ticket_row"

export default {
  components: {
    TicketRow
  },
  data() {
    return {
        projectId: this.$route.params.id,
        presenter: new BacklogPresenter(),
        sprint_name: null,
        project_name: "",
        items: null
    };
  },
  beforeMount() {
    let projectPresenter = new ProjectPresenter()
    projectPresenter.find(this.projectId).then((data) => {
      this.project_name = data.project_name
    })
    this.presenter.readActiveSprint(this.projectId).then((data) => {
      this.items = data.tickets;
      this.sprint_name = data.sprint_name
    }).catch((error) => {
        this.items = []
    })
  },
};
</script>
