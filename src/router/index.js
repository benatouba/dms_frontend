import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home'
import Search from '../views/Search'
import Upload from '../views/Upload'
import Contact from '../views/Contact'
import Register from '../components/Register'
import Login from '../components/Login'
import RequestPassword from '../components/RequestPassword'
import Account from '../views/Account'
import Administration from '../views/Administration'
import ResetPassword from '@/components/ResetPassword'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
    },
    {
        path: '/administration',
        name: 'Administration',
        component: Administration,
    },
    {
        path: '/requestpassword',
        name: 'RequestPassword',
        component: RequestPassword,
    },
    {
        path: '/resetpassword/:token',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: {
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
    ]
    const authRequired = !publicPages.includes(to.path)
    const username = !!store.state.account.username
    console.log(to)
    if (authRequired && !username && !to.meta.public) {
        return next('/login')
    }

    next()
})

export default router
