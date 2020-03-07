<template>
  <v-layout column justify-center align-center>
    <v-container xs12 sm10 md10>
      <v-card width="100%">
        <v-card-title>Sprint 55</v-card-title>
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
import KanbanPresenter from '~/presenter/kanban_presenter'
import TicketRow from "~/components/ticket_row"

export default {
  components: {
    TicketRow
  },
  data() {
    return {
        presenter: new KanbanPresenter(),
        items: []
    };
  },
  beforeMount() {
      this.items = this.items.concat(this.presenter.read());
  },
  methods: {
    test() {
        console.log(this.presenter)
    }
  }
};
</script>
