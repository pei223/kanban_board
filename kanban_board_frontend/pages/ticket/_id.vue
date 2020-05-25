<template>
    <div>
      <div v-if="loading" class="progress-box">
        <v-progress-circular
          :size="70"
          :width="7"
          color="white"
          indeterminate
          style="vertical-align: middle"
        ></v-progress-circular>
      </div>
      <v-layout v-else column justify-center align-center>
        <v-container xs12 sm10 md10>
          <v-card width="100%" class="pa-4">
            <v-text-field
              v-model="ticket_title"
              label="チケット名" class="mb-6" />
            <v-textarea
              solo
              v-model="description"
              label="チケットの説明文"
            ></v-textarea>
            <v-select
              label="スプリント"
              background-color="transparent"
              :items="sprints"
              item-text="name"
              item-value="id"
              solo
              v-model="sprint_id"
              class="mb-6" />
            <v-text-field
              v-model="release_version"
              label="リリースバージョン" class="mb-6" />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="submit()" color="primary" class="ml-6">
                <span v-if="isNewTicket()">登録</span>
                <span v-else>更新</span>
              </v-btn>
              <v-btn v-if="!isNewTicket()" color="error" class="ml-6" @click="show_confirm_delete_dialog=true">
                削除
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>

        <v-dialog
          v-model="show_confirm_delete_dialog"
          width="300">
          <v-card>
            <v-card-title primary-title>チケット削除</v-card-title>
            <v-card-text>
              チケット　{{ ticket_title }}　を削除します。よろしいですか？
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="show_confirm_delete_dialog=false">いいえ</v-btn>
              <v-btn @click="onDeleteClicked()" color="error" class="ml-6">はい</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
  </div>
</template>

<script>
import "reflect-metadata";
import BacklogPresenter from "~/presenter/backlog_presenter";
import SprintPresenter from '~/presenter/sprint_presenter'
import projectStore from '../../store/project_store'

export default {
  data() {
    return {
      id: this.$route.params.id,
      presenter: new BacklogPresenter(),
      loading: false,
      show_confirm_delete_dialog: false,
      sprints: [],
      ticket_title: null,
      sprint_id: this.$route.query.sprint_id,
      project_id: this.$route.query.project_id,
      description: "",
      kind: "実装",
      release_version: "",
      story_point: 1,
      tag1: "",
      tag2: "",
      status: 1,
    };
  },
  beforeMount() {
    this.fetchSprints()
    // TODO プロジェクト情報のfetch
    if (this.isNewTicket()) {  // 新規チケット
      return;
    }
    this.loading = true
    this.presenter.find(parseInt(this.id)).then((data) => {
      this.loading = false
      this.ticket_title = data.title
      this.description = data.description
      this.kind = data.kind
      this.release_version = data.release_version
      this.story_point = data.story_point
      this.sprint_id = data.sprint_id
      this.tag1 = data.tag1
      this.tag2 = data.tag2
    }).catch((error) => {
      this.loading = false
      window.alert(`チケット取得に失敗しました. 管理者に報告してください.\n${error}`)
      console.error(error.response)
    })
  },
  methods: {
    updateSprintId(sprintId) {
      this.sprint_id = sprintId
    },
    fetchSprints() {
      new SprintPresenter().read(this.project_id).then((data) => {
        this.sprints = data
      }).catch((error) => {
        console.error(error.response)
        // TODO エラー処理
      })
    },
    submit() {
      let packedInfo = this.packTicketInfo()
      if (this.isNewTicket()) {
        this.presenter.create(packedInfo).then((result) => {
          this.$router.push(`/backlog/${this.project_id}?sprint_id=${this.sprint_id}`)
        }).catch((error) => {
          window.alert(`チケット更新に失敗しました. 管理者に報告してください.\n${error}`)
          console.error(error.response)
        })
        return
      }
      this.presenter.update(this.id, packedInfo).then((result) => {
        // TODO 完了ダイアログ
      }).catch((error) => {
        window.alert(`チケット更新に失敗しました. 管理者に報告してください.\n${error}`)
        console.error(error.response)
      })
    },
    onDeleteClicked() {
      if (this.isNewTicket()) {
        return
      }
      this.presenter.delete(this.id).then((result) => {
        this.$router.push(`/backlog/${this.project_id}?sprint_id=${this.sprint_id}`)
      }).catch((error) => {
        window.alert(`チケット削除に失敗しました. 管理者に報告してください.\n${error}`)
        console.error(error.response)
      })
    },
    isNewTicket() {
      return this.id === "new"
    },
    packTicketInfo() {
      return {
        title: this.ticket_title,
        sprint_id: this.sprint_id,
        description: this.description,
        story_point: this.story_point,
        kind: this.kind,
        release_version: this.release_version,
        tag_1: this.tag1,
        tag_2: this.tag2,
        status: this.status
      }
    }
  }
};
</script>

<style>
.progress-box {
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>