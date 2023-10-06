import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        headerPadding: '',
    }),
    actions: {
        setHeaderPadding(value) {
            this.headerPadding = value;
        }
    },
    getters: {
        getHeaderPadding() {
            return this.headerPadding;
        }
    }
})