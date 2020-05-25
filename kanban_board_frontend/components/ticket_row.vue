<template>
    <v-card class="pt-2">
     <v-container class="grey lighten-5 pt-1 pb-1 pl-6 pr-6">
         <v-row>
            <v-col cols=10 class="mr-2 pa-0">
                <v-card-text class="ticket-title" @click="link(`/ticket/${item.id}?project_id=${project_id}`)">{{ item.title }}</v-card-text>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="auto" class="pa-0">
                <v-chip class="ma-2">
                    {{ item.story_point }}
                </v-chip>
            </v-col>
         </v-row>
     </v-container>
    </v-card>
</template>

<script>
export default {
    props: ['item', 'project_id'],
    methods: {
        link(ticketId) {
            this.$router.push(ticketId)
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