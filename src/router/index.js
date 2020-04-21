import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Search from "@/views/Search";
import Upload from "@/views/Upload";
import Contact from "@/views/Contact";
import SignUp from "@/components/SignUp";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/signup",
    name: "Register",
    component: SignUp
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
      {
    path: "/upload",
    name: "Upload",
    component: Upload
  },
          {
    path: "/contact",
    name: "Contact",
    component: Contact
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
