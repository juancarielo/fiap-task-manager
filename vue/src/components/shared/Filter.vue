<template>
    <div class="container-filtros">
        <div class="title">
            <span>Tarefas</span>
            <img
                src="/filter.svg"
                alt="Filtrar tarefas"
                @click="showFilters = !showFilters"
            />
            <div class="form">
                <div>
                    <label>Data prevista de conclusão de:</label>
                    <input
                        type="date"
                        :value="finishPrevisionStart"
                        @input="
                            $emit(
                                'setFinishPrevisionStart',
                                $event.target.value
                            )
                        "
                    />
                </div>
                <div>
                    <label> até:</label>
                    <input
                        type="date"
                        :value="finishPrevisionEnd"
                        @input="
                            $emit(
                                'setFinishPrevisionEnd',
                                $event.target.value
                            )
                        "
                    />
                </div>
                <div class="line" />
                <div>
                    <label>Status:</label>
                    <select
                        :value="status"
                        @input="
                            $emit(
                                'setStatus',
                                $event.target.value
                            )
                        "
                    >
                        <option value="0">Todas</option>
                        <option value="1">Ativas</option>
                        <option value="2">Concluídas</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="filtrosMobile" v-if="showFilters">
            <div>
                <label>Período de:</label>
                <input type="date" :value="finishPrevisionStart" />
            </div>
            <div>
                <label>Período até:</label>
                <input type="date" :value="finishPrevisionEnd" />
            </div>
            <div>
                <label>Status:</label>
                <select :value="status">
                    <option value="0">Todas</option>
                    <option value="1">Ativas</option>
                    <option value="2">Concluídas</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showFilters: false
        };
    },
    props: {
        finishPrevisionStart: "",
        finishPrevisionEnd: "",
        status: 0
    }
};
</script>

<style lang="scss"></style>
