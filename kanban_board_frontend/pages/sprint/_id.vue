<template>
  <v-layout column justify-center align-center>
    <v-container xs12 sm10 md10>
      <v-card width="100%" class="pa-4">
        <v-select
          label="プロジェクト"
          background-color="transparent"
          :items="projectState.projects"
          item-text="project_name"
          item-value="id"
          solo
          readonly
          v-model="selected_project_id"
          class="mb-6"
        ></v-select>
        <v-text-field
          v-model="sprint_name"
          label="スプリント名" class="mb-6" />
        <v-btn v-on:click="submit" color="indigo">
          <span v-if="id === 'new'">登録</span>
          <span v-else>更新</span>
        </v-btn>
        <v-btn v-if="id !== 'new'" color="error" class="ml-6" @click="show_confirm_delete_dialog=true">
          削除
        </v-btn>
      </v-card>
    </v-container>

    <v-dialog
      v-model="show_confirm_delete_dialog"
      width="300">
      <v-card>
        <v-card-title
          primary-title>
        スプリント削除
        </v-card-title>
        <v-card-text>
          スプリント　{{ sprint_name }}　を削除します。よろしいですか？
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="show_confirm_delete_dialog=false">いいえ</v-btn>
          <v-btn @click="onDeleteClicked()" color="error" class="ml-6">はい</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-progress-circular
      v-model="show_progress"
      v-if="show_progress"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-layout>
</template>

<script>
import "reflect-metadata"
import SprintPresenter from '~/presenter/sprint_presenter'
import projectStore from '../../store/project_store'

export default {
  data() {
    return {
        id: this.$route.params.id,
        presenter: new SprintPresenter(),
        projectState: projectStore.state,
        selected_project_id: null,
        sprint_name: "",
        show_confirm_delete_dialog: false,
        show_progress: false
    };
  },
  beforeMount() {
    this.selected_project_id = this.projectState.selected_id
    if (this.isNewSprint()) {
        return
    }
    this.presenter.find(this.id).then((data) => {
        this.sprint_name = data.name
    }).catch((error) => {
        this.id = "new"
    })
  },
  methods: {
      submit() {
        this.show_progress = true
        if (this.isNewSprint()) {
            this.presenter.create(this.sprint_name, this.selected_project_id).then((result)=>{
                this.presenter.read()
                this.$parent.$router.push(`/sprint_list/${this.projectState.selected_id}`);
            }).catch((error) => {
              window.alert("スプリント登録に失敗しました.")
              this.show_progress = false
            })
            return
        }
        this.presenter.update(this.id, this.sprint_name).then((result)=>{
            this.presenter.read()
            this.$parent.$router.push(`/backlog/${this.id}`);
        }).catch((error) => {
            window.alert("スプリント更新に失敗しました.")
        })  
      },
      onDeleteClicked() {
        this.show_progress = true
        if (this.isNewSprint()) {
          return
        }
        this.presenter.delete(this.id).then((result) => {
          this.$parent.$router.push(`/sprint_list/${this.projectState.selected_id}`);
        }).catch((error) => {
          this.show_progress = false
          window.alert("プロジェクト削除に失敗しました.")
        })
      },
      isNewSprint() {
        return this.id === "new"
      }
  },
};
</script>
