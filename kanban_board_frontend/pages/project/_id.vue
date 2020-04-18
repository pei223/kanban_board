<template>
  <v-layout column justify-center align-center>
    <v-container xs12 sm10 md10>
      <v-card width="100%" class="pa-4">
        <v-text-field
          v-model="project_name"
          label="プロジェクト名" class="mb-6" />
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
        プロジェクト削除
        </v-card-title>
        <v-card-text>
          プロジェクト　{{ project_name }}　を削除します。よろしいですか？
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
import ProjectPresenter from '~/presenter/project_presenter'

export default {
  data() {
    return {
        id: this.$route.params.id,
        presenter: new ProjectPresenter(),
        project_name: "",
        show_confirm_delete_dialog: false,
        show_progress: false
    };
  },
  beforeMount() {
    if (this._isNewProject()) {
        return
    }
    this.presenter.find(this.id).then((data) => {
        this.project_name = data.project_name
    }).catch((error) => {
        this.id = "new"
    })
  },
  methods: {
      submit() {
        this.show_progress = true
        if (this._isNewProject()) {
            this.presenter.create(this.project_name).then((result)=>{
                this.presenter.read()
                this.$parent.$router.push(`/backlog/${this.id}`);
            }).catch((error) => {
              window.alert("プロジェクト登録に失敗しました.")
              this.show_progress = false
            })
            return
        }
        this.presenter.update(this.id, this.project_name).then((result)=>{
            this.presenter.read()
            this.$parent.$router.push(`/backlog/${this.id}`);
        }).catch((error) => {
            window.alert("プロジェクト更新に失敗しました.")
        })  
      },
      onDeleteClicked() {
        this.show_progress = true
        if (this._isNewProject()) {
          return
        }
        this.presenter.delete(this.id).then((result) => {
          this.$parent.$router.push(`/projects`);
        }).catch((error) => {
          this.show_progress = false
          window.alert("プロジェクト削除に失敗しました.")
        })
      },
      _isNewProject() {
        return this.id === "new"
      }
  },
};
</script>
