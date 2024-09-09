// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import fs from 'fs'

export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	css: ['~/assets/css/main.css'],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	devtools: { enabled: true },

	typescript: {
		typeCheck: true,
	},

	runtimeConfig: {
		apiSecret: 'secret!!!',
		public: {
			apiBase: process.env.API_BASE_URL || 'no-url',
		},
	},

	modules: ['@pinia/nuxt'],
})
