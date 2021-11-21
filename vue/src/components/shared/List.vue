<template>
    <div class="container-listagem" :class="getClassVazia">
        <list-item v-if="listHasItems" v-for="ta of tasks" :task="ta" />

        <div v-if="!listHasItems">
            <img
                src="../../assets/images/empty-list.svg"
                alt="Nenhuma tarefa encontrada"
            />
            <p>Você ainda não possui tarefas cadastradas!</p>
        </div>
    </div>
</template>
<script>
import Item from "./Item.vue";
export default {
    props: {
        tasks: []
    },
    computed: {
        listHasItems() {
            return this.tasks && this.tasks.length > 0;
        },
        getClassVazia() {
            if (this.tasks && this.tasks.length > 0) {
                return "";
            }
            return "vazia";
        }
    },
    components: {
        "list-item": Item
    }
};
</script>
<style lang="scss"></style>
