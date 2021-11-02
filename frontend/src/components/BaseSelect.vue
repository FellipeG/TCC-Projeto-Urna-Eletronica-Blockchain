<template>
    <div class="form-group" :class="[{'has-label': labelText}]">
        <label v-if="labelText">{{ labelText }} <span v-if="required">*</span></label>
        <v-select
            @input="updateValue"
            append-to-body
            :calculate-position="withPopper"
            :options="options"
            class="style-chooser"
            v-bind="$attrs"></v-select>
    </div>
</template>

<script>

import { createPopper } from "@popperjs/core";

export default {

    data() {
        return {
        }
    },
    props: {
        labelText: {
            type: String,
            description: "Define o texto de label para o select",
            default: null
        },
        required: {
            type: Boolean,
            description: "Define através do asterisco se o campo é ou não obrigatório",
            default: false
        },
        options: {
            type: Array,
            description: "Define as options do select",
        },
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value);
        },
        withPopper(dropdownList, component, { width }) {
            dropdownList.style.width = width;
            const popper = createPopper(component.$refs.toggle, dropdownList, {
                placement: 'bottom',
                modifiers: [
                    {
                        name: "offset",
                        options: {
                        offset: [0, -1]
                        }
                    },
                ]
            });
            return () => popper.destroy();
        }
    }
}
</script>

<style>
    .style-chooser .vs__search::placeholder,
    .style-chooser .vs__dropdown-toggle,
    .style-chooser .vs__dropdown-menu {
        background: #fff;
        border: 1px solid #cad1d7;
        color: #8898aa;
    }

    .style-chooser .vs__search::placeholder,
    .style-chooser .vs__dropdown-toggle {
        min-height: 46px;
    }

    .style-chooser .vs__clear,
    .style-chooser .vs__open-indicator {
        fill: #8898aa;
    }
</style>