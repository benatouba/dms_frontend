import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Search from '../views/Search'
import Upload from '../views/Upload'
import Contact from '../views/Contact'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'

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
        component: SignIn,
    },
    {
        path: '/register',
        name: 'Register',
        component: SignUp,
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
    { path: '*', redirect: 'Home' },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('user')

    if (authRequired && !loggedIn) {
        return next('/login')
    }

    next()
})

export default router
