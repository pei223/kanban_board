<template>
    <v-card class="pt-2">
     <v-container class="grey lighten-5">
         <v-row align-content="center">
            <v-col cols=1>
                <v-card-text class="text">{{ item.id }}</v-card-text>
            </v-col>
            <v-col cols=1>
                <v-icon style="color: black; height: 100%;">mdi-view-list</v-icon>
            </v-col>
            <v-col cols=10>
                <v-card-text class="ticket-title" @click="link(`/project/${item.id}`)">{{ item.project_name }}</v-card-text>
            </v-col>
         </v-row>
     </v-container>
    </v-card>
</template>

<script>
export default {
    props: ['item'],
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
</style>