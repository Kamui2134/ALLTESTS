import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
	state: () => ({
		loading: false,
	}),
	actions: {
		changeLoading(value: boolean) {
			this.loading = value
		},
	},
})
