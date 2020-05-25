<template>
    <v-card class="pt-2">
     <v-container v-bind:class="[item.is_active ? 'active-sprint': 'grey', 'lighten-5',  'pt-1', 'pb-1', 'pl-6', 'pr-6']">
         <v-row align-content="center">
            <v-col cols=11 class="pa-0">
                <v-card-text class="ticket-title" @click="link(`/backlog/${projectState.selected_id}?sprint_id=${item.id}`)">
                    {{ item.name }}<span v-if="item.is_active">　(Active sprint)</span>
                </v-card-text>
            </v-col>
            <v-spacer/>
            <v-col class="pa-0" style="align-self: center;">
                <v-btn icon color="black"  @click="link(`/sprint/${item.id}`)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-col>
         </v-row>
     </v-container>
    </v-card>
</template>

<script>
import projectStore from '../store/project_store'


export default {
    props: ['item'],
    data() {
        return {
            projectState: projectStore.state,
        }
    },
    methods: {
        link(path) {
            this.$router.push(path)
        }
    }
};
</script>
<style>
.text {
    color: black;
}
.ticket-title {
    color: black;
    font-size: 1.2em;
}
.active-sprint {
    background-color: silver !important;
}
</style>