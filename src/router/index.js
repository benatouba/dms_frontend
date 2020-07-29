import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home'
import Search from '../views/Search'
import Upload from '../views/Upload'
import Contact from '../views/Contact'
import Register from '../components/Register'
import Login from '../components/Login'
import Account from '../views/Account'
import Administration from '../views/Administration'

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
    { path: '/*', redirect: '/' },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register', '/home', '/contact', '/', '/search']
    const authRequired = !publicPages.includes(to.path)
    const username = !!store.state.account.username

    if (authRequired && !username) {
        return next('/login')
    }

    next()
})

export default router
