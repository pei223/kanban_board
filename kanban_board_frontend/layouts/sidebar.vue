<template>
    <div>
        <v-list-item>
            <v-list-item-avatar>
            <v-img :src="user_icon_url"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title>{{ user_name }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list dense>
            <v-list-item
            @click="link(item.path)"
            v-for="item in items"
            :key="item.title"
            link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user_icon_url: "https://randomuser.me/api/portraits/men/81.jpg",
            user_name: "UserName",
            items: [
                {icon: "mdi-view-list", title: "プロジェクト管理", path: "/projects"},
            ]
        }
    },    
    methods: {
        link(path) {
            this.$parent.$router.push(path);
        }
    },
}
</script>