import Layout from "../layout/Index.vue";
import RouteView from "../components/RouteView.vue";

const layoutMap = [
    {
        path: "",
        name: "Index",
        meta: { title: "文件发送", icon: "HomeFilled" },
        component: () => import("../views/Index.vue")
    },
    {
        path: "data",
        name: "Data",
        meta: { title: "数据列表", icon: "DataLine" },
        component:()=>import("../views/data/List.vue")
    },
    {
        path: "table",
        name: "Table",
        meta: { title: "文件接受", icon: "" },
        component: () => import("../views/data/Table.vue")
    },
    {
        path: "admin",
        name: "Admin",
        meta: { title: "用户管理", icon: "User", roles: ["admin"] },
        component: RouteView,
        children: [
            {
                path: "",
                name: "AdminAuth",
                meta: { title: "用户列表" },
                component: () => import("../views/admin/AuthList.vue")
            },
            {
                path: "role",
                name: "AdminRole",
                meta: { title: "角色列表" },
                component: () => import("../views/admin/RoleList.vue")
            }
        ]
    },
    {
        path: "user",
        name: "User",
        hidden: true /* 不在侧边导航展示 */,
        meta: { title: "个人中心" },
        component: () => import("../views/admin/User.vue")
    },
    {
        path: "/error",
        name: "NotFound",
        hidden: true,
        meta: { title: "404" },
        component: () => import("../components/NotFound.vue")
    },
    {
        path: "/:w+",
        hidden: true,
        redirect: { name: "NotFound" }
    }
];

const routes = [
    { 
        path: "/login",
        name: "Login", 
        meta: { title: "登录" }, component: () => import("../views/login/Login.vue")
     },
    { path: "/", name: "Layout", component: Layout, children: [...layoutMap] }
];

export { routes, layoutMap };
