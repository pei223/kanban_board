<template>
    <v-card class="pt-2">
     <v-container class="grey lighten-5">
         <v-row>
            <v-col class="mr-2" md="auto">
                <v-card-text class="text">{{ item.id }}</v-card-text>
            </v-col>
            <v-col class="mr-2">
                <v-card-text class="ticket-title" @click="link('/tickets/' + item.id)">{{ item.title }}</v-card-text>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="auto">
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
    props: ['item'],
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