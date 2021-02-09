import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home'
import Files from '../views/Files'
import Upload from '../views/Upload'
import Contact from '../views/Contact'
import Register from '../components/Register'
import Login from '../components/Login'
import RequestPassword from '../components/RequestPassword'
import Account from '../views/Account'
import Administration from '../views/Administration'
import ResetPassword from '@/components/ResetPassword'
import AdmitUser from '@/components/AdmitUser'
import DeclineUser from '@/components/DeclineUser'

import i18n from '../plugins/i18n'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: i18n.t('home.title') + ' [UC]² DMS',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: i18n.t('login.title') + ' [UC]² DMS',
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: i18n.t('register.title') + ' [UC]² DMS',
        },
    },
    {
        path: '/search',
        name: 'Search',
        component: Files,
        meta: {
            title: i18n.t('search.title') + ' [UC]² DMS',
        },
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload,
        meta: {
            title: i18n.t('upload.title') + ' [UC]² DMS',
        },
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: {
            title: i18n.t('contact.title') + ' [UC]² DMS',
        },
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: {
            title: i18n.t('account.title') + ' [UC]² DMS',
        },
    },
    {
        path: '/administration',
        name: 'Administration',
        component: Administration,
        meta: {
            title: i18n.t('admin.title') + ' [UC]² DMS',
        },
    },
    {
        path: '/requestpassword',
        name: 'RequestPassword',
        component: RequestPassword,
        meta: {
            title: i18n.t('request_password.title') + ' [UC]² DMS',
        },
    },
    {
        path: '/resetpassword/:token',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: {
            title: i18n.t('reset_password.title') + ' [UC]² DMS',
            public: true,
        },
    },
    {
        path: '/admituser/:token',
        name: 'AdmitUser',
        component: AdmitUser,
        meta: {
            title: i18n.t('manage_user.admit_title') + ' [UC]² DMS',
            public: true,
        },
    },
    {
        path: '/declineuser/:token',
        name: 'DeclineUser',
        component: DeclineUser,
        meta: {
            title: i18n.t('manage_user.decline_title') + ' [UC]² DMS',
            public: true,
        },
    },
    { path: '/*', redirect: '/' },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    // set title
    document.title = to.meta.title
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = [
        '/login',
        '/register',
        '/home',
        '/contact',
        '/',
        '/search',
        '/requestpassword',
        '/resetpassword',
        '/declineuser',
        '/admituser',
    ]
    const authRequired = !publicPages.includes(to.path)
    const username = !!store.state.account.username
    if (authRequired && !username && !to.meta.public) {
        return next('/login')
    } else next()
})

export default router
