module.exports = {
    transpileDependencies: ['vuetify'],

    devServer: {
        proxy: 'http://localhost:8000/',
    },

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'de',
            localeDir: 'locales',
            enableInSFC: false,
        },
    },

    //publicPath: '',
    assetsDir: 'assets/'
}
