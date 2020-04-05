<template>
  <v-layout column justify-center align-center>
    <v-container xs12 sm10 md10>
      <v-card width="100%">
        <v-text-field
          v-model="project_name"
          label="プロジェクト名"
        />
        <v-btn text v-on:click="submit">登録</v-btn>
      </v-card>
    </v-container>
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
        if (this._isNewProject()) {
            this.presenter.create(this.project_name).then((result)=>{
                this.presenter.read()
                this.$parent.$router.push(`/backlog/${this.id}`);
            })
            return
        }
        this.presenter.update(this.id, this.project_name).then((result)=>{
            this.presenter.read()
            this.$parent.$router.push(`/backlog/${this.id}`);
        })
      },
    _isNewProject() {
      return this.id === "new"
    }
  },


};
</script>
