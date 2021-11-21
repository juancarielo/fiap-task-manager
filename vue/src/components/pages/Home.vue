<template>
    <div class="container-home">
        <myHeader @doLogout="sair" />
        <myFilter
            :finishPrevisionStart="finishPrevisionStart"
            :finishPrevisionEnd="finishPrevisionEnd"
            :status="status"
            @setSinishPrevisionStart="setSinishPrevisionStart"
            @setSinishPrevisionEnd="setSinishPrevisionEnd"
            @setStatus="setStatus"
        />
        <myList :tasks="tasks" />
        <myFooter />
    </div>
</template>
<script>
import Header from "../shared/Header.vue";
import Footer from "../shared/Footer.vue";
import Filter from "../shared/Filter.vue";
import List from "../shared/List.vue";
export default {
    data() {
        return {
            finishPrevisionStart: "2021-10-01",
            finishPrevisionEnd: "2021-10-31",
            status: 2,
            tasks: []
        };
    },
    created() {
        this.getTasksWithFilters();
    },
    components: {
        myHeader: Header,
        myFooter: Footer,
        myFilter: Filter,
        myList: List
    },
    methods: {
        sair() {
            this.$emit("token", "");
        },
        setSinishPrevisionStart(d) {
            this.finishPrevisionStart = d;
            this.getTasksWithFilters();
        },
        setSinishPrevisionEnd(d) {
            this.finishPrevisionEnd = d;
            this.getTasksWithFilters();
        },
        setStatus(s) {
            this.status = s;
            this.getTasksWithFilters();
        },
        getTasksWithFilters() {
            let filtros = "?status=" + this.status;

            if (this.finishPrevisionStart) {
                filtros += "&finishPrevisionStart=" + this.finishPrevisionStart;
            }

            if (this.finishPrevisionEnd) {
                filtros += "&finishPrevisionEnd=" + this.finishPrevisionEnd;
            }

            const token = localStorage.getItem("accessToken");

            this.$http
                .get("task" + filtros, {
                    headers: { Authorization: "Bearer " + token }
                })
                .then(r => r.json())
                .then(result => {
                    this.tasks = result;
                });
        }
    }
};
</script>
<style lang="scss"></style>
