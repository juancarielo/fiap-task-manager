<template>
    <div class="container-item" :class="getClassAtivo">
        <img :src="getImgSrc" :alt="getImgAlt" />
        <div>
            <p :class="getClassConcluido">{{ task && task.name }}</p>
            <span>{{ getDateText }}</span>
        </div>
    </div>
</template>
<script>
import moment from "moment";
export default {
    props: {
        task: {
            name: "",
            finishDate: "",
            finishPrevisionDate: ""
        }
    },
    computed: {
        getClassAtivo() {
            if (this.task && this.task.finishDate) {
                return "";
            }

            return "ativo";
        },
        getClassConcluido() {
            if (this.task && this.task.finishDate) {
                return "concluido";
            }

            return "";
        },
        getImgSrc() {
            if (this.task && this.task.finishDate) {
                return require("../../assets/images/finished.svg");
            }

            return require("../../assets/images/not-finished.svg");
        },
        getImgAlt() {
            if (this.task && this.task.finishDate) {
                return "Tarefa concluída";
            }

            return "Tarefa não concluída";
        },
        getDateText() {
            if (this.task && this.task.finishDate) {
                return `Concluído em: ${moment(this.task.finishDate).format(
                    "DD/MM/yyyy"
                )}`;
            }
            if (this.tasks && this.task.finishPrevisionDate) {
                return `Previsão de conclusão em: ${moment(
                    this.task.finishPrevisionDate
                ).format("DD/MM/yyyy")}`;
            }
            return "Previsão de conclusão em:";
        }
    }
};
</script>
<style lang="scss"></style>
