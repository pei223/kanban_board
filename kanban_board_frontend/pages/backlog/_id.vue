<template>
  <v-layout column justify-center align-center>
    <v-container xs12 sm10 md10>
      <h2 style="margin-bottom: 20px">{{ project_name }}</h2>
      <v-card width="100%">
        <v-card-title>
          {{ sprint_name }}
          <span v-if="is_data_fetched && !is_error_occurred">
            <v-btn
              v-if="is_sprint_active"
              color="green"
              dark
              absolute
              right
              @click="closeSprint()">
              クローズする
            </v-btn>
            <v-btn
              v-else
              color="blue"
              dark
              absolute
              right
              @click="activateSprint()">
              アクティブスプリントにする
            </v-btn>
          </span>

        </v-card-title>
        <v-card-title v-if="is_sprint_not_exist">
          <span v-if="isActiveSprintRequest()">アクティブスプリントはありません</span>
          <span v-else>存在しないスプリントです</span>
        </v-card-title>
        <v-card-title v-else-if="is_data_fetched && tickets.length === 0">
          チケットはありません
        </v-card-title>
        <v-list>
            <template v-for="(item, index) in tickets">
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
import SprintPresenter from '~/presenter/sprint_presenter'
import ProjectPresenter from '~/presenter/project_presenter'
import TicketRow from "~/components/ticket_row"


export default {
  components: {
    TicketRow
  },
  data() {
    return {
        backlogPresenter: new BacklogPresenter(),
        sprint_id: this.$route.query.sprint_id,
        projectId: this.$route.params.id,
        project_name: "",
        sprint_name: null,
        tickets: null,
        // TODO フラグだらけなのなんとかしたい
        is_sprint_closed: false,
        is_sprint_active: false,
        is_data_fetched: false,
        is_error_occurred: false,
        is_sprint_not_exist: false,
    };
  },
  beforeMount() {
    let projectPresenter = new ProjectPresenter()
    projectPresenter.selectProject(this.projectId)
    projectPresenter.find(this.projectId).then((data) => {
      this.project_name = data.project_name
    })
    if (this.isActiveSprintRequest()) {
      this.backlogPresenter.readActiveSprint(this.projectId).then((data) => {
        this.applyResponseToData(data)
      }).catch((error) => {
        this.onErrorResponse(error)
      })
      return
    }
    this.backlogPresenter.read(this.sprint_id, this.projectId).then((data) => {
      this.applyResponseToData(data)
    }).catch((error) => {
      this.onErrorResponse(error)
    })
  },

  methods: {
    applyResponseToData(response) {
        this.tickets = response.tickets
        this.sprint_name = response.sprint_name
        this.is_sprint_active = response.is_active
        this.is_sprint_closed = response.is_closed
        this.is_data_fetched = true
        this.is_error_occurred = false
        this.is_sprint_not_exist = false
    },
    onErrorResponse(error) {
      this.tickets = []
      this.is_data_fetched = true
      this.sprint_name = undefined
      this.is_data_fetched = true
      this.is_error_occurred = true
      this.is_sprint_not_exist = error.response.status === 404
      if (!this.is_sprint_not_exist) {
        window.alert(`チケットの取得に失敗しました。管理者に報告してください。\n${error}\n${error.response}`)
        console.error(error.response)
      }
    },
    isActiveSprintRequest() {
      return this.sprint_id === "active"
    },
    closeSprint() {
      if (!this.is_sprint_active) {
        console.error("アクティブスプリントではない")
        return
      }
      new SprintPresenter().closeSprint(this.projectId).then((result) => {
        this.$parent.$router.push(`/sprint_list/${this.projectId}`);
      }).catch((error) => {
        // クローズできるスプリントがない
        if (error.response.status === 404) {
          window.alert('アクティブなスプリントはありません.')
          return
        }
        console.error(error.response)
        window.alert(`スプリントのクローズに失敗しました。管理者に報告してください。\n${error}\n${error.response}`)
      })
    },
    activateSprint() {
      if (this.is_sprint_active) {
        console.log("アクティブスプリントをactivateしようとしている")
        return
      }
      new SprintPresenter().activateSprint(this.sprint_id).then((result) => {
        this.$parent.$router.push(`/backlog/${this.projectId}?sprint_id=active`);
      }).catch((error) => {
        // 他にアクティブなスプリントがある
        if (error.response.status === 405) {
          window.alert('すでにアクティブなスプリントが存在します.')
          return
        }
        console.error(error.response)
        window.alert(`スプリントのアクティブ化に失敗しました。管理者に報告してください。\n${error}\n${error.response}`)
      })
    }
  },
};
</script>
