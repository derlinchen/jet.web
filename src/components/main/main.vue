<template>
    <Layout style="height: 100%" class="main">
        <!-- 左边区域 -->
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider"
            :style="{ overflow: 'hidden', background:'#fff' }">
            <!-- 左边菜单 -->
            <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed"
                @on-select="turnToPage" :menu-list="menuList" :theme="theme">
                <!-- 系统logo -->
                <div class="logo-con">
                    <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
                    <img v-show="collapsed" :src="minLogo" key="min-logo" />
                </div>
            </side-menu>
        </Sider>
        <!-- 右边区域 -->
        <Layout>
            <!-- 头部 -->
            <Header class="header-con">
                <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                    <!-- 个人中心 -->
                    <user :user-avatar="userAvatar" />
                    <!-- 全屏 -->
                    <fullscreen v-model="isFullscreen" style="margin-right: 10px;" />
                </header-bar>
            </Header>
            <!-- 内容 -->
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <!-- tag菜单导航 -->
                    <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag" />
                    </div>
                    <!-- 菜单内容页 -->
                    <Content class="content-wrapper">
                        <!-- 通过router-view进行路由跳转 -->
                        <router-view v-slot="{ Component }">
                            <keep-alive :include="cacheList">
                                <component :is="Component" />
                            </keep-alive>
                        </router-view>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import User from './components/user'
import Fullscreen from './components/fullscreen'
import TagsNav from './components/tags-nav'
import { routeEqual } from '@/libs/util'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'

import './main.less'

export default {
    name: 'Main',
    components: {
        // 菜单栏
        SideMenu,
        // 系统头部
        HeaderBar,
        // 是否全屏
        Fullscreen,
        // 用户信息
        User,
        // 点击菜单tag
        TagsNav
    },

    data() {
        return {
            // 是否折叠
            collapsed: false,
            // 折叠时logo
            minLogo,
            // 非折叠时logo
            maxLogo,
            // 是否全屏
            isFullscreen: false,
            // 设置主题
            theme: 'light'
        }
    },

    computed: {
        // 从localstorage中获取菜单信息
        menuList() {
            return this.$store.getters.getMenuList
        },
        // 获取登录后个人头像
        userAvatar() {
            return 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
        },
        // 获取菜单tag
        tagNavList() {
            return this.$store.state.app.tagNavList
        },
        // 对菜单list进行缓存
        cacheList() {
            const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
            return list
        }
    },

    methods: {
        ...mapMutations([
            // 设置面包屑
            'setBreadCrumb',
            // 添加tag
            'addTag',
            // 关闭tag
            'closeTag',
            // 设置tag列表
            'setTagNavList',
        ]),

        // 路由跳转
        turnToPage(route) {
            // 定义name, params, query
            let { name, params, query } = {}

            // 判断当前跳转是否为路由直接跳转
            // 直接跳转
            if (typeof route === 'string') {
                name = route
            } else {
                // 带参跳转
                name = route.name
                params = route.params
                query = route.query
            }

            // 执行路由跳转
            this.$router.push({
                name,
                params,
                query
            })
        },
        // 折叠处理
        handleCollapsedChange(state) {
            // 处理折叠逻辑
            this.collapsed = state
        },

        // 页面tag点击时进行页面跳转
        handleClick(item) {
            // 页面跳转
            this.turnToPage(item)
        },

        // 关闭页面tag
        handleCloseTag(res, type, route) {
            if (type !== 'others') {
                if (type === 'all') {
                    this.turnToPage(this.$config.indexName)
                } else {
                    if (routeEqual(this.$route, route)) {
                        this.closeTag(route)
                    }
                }
            }
            this.setTagNavList(res)
        }
    },

    watch: {
        // 监听路由变化
        '$route'(newRoute) {
            // 获取新路由信息
            const { name, query, params, meta } = newRoute
            if (name !== this.$config.indexName && name !== this.$config.loginName) {
                // 将路由添加到tag
                this.addTag({
                    route: { name, query, params, meta },
                    type: 'push'
                })
            }
            // 设置面包屑
            this.setBreadCrumb(newRoute)

        }
    },

    mounted() {

        // 获取tag导航
        this.setTagNavList()

        // 页面渲染后，将页面加入tag，类似tab页
        const { name, params, query, meta } = this.$route
        if (name !== this.$config.indexName) {
            this.addTag({
                route: { name, params, query, meta }
            })
        }

        // 设置面包屑
        this.setBreadCrumb(this.$route)
    }
}
</script>
