<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider"
            :style="{ overflow: 'hidden' }">
            <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed"
                @on-select="turnToPage" :menu-list="menuList">
                <div class="logo-con">
                    <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
                    <img v-show="collapsed" :src="minLogo" key="min-logo" />
                </div>
            </side-menu>
        </Sider>

        <Layout>
            <Header class="header-con">
                <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                </header-bar>
            </Header>

            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <!-- <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
                    </div> -->
                    <Content class="content-wrapper">
                        <keep-alive :include="cacheList">
                            <router-view />
                        </keep-alive>
                        <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>



<script>
import './main.less'
import { getMenuListFromLocalstorage } from '@/libs/util'

import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'

import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
    name: 'Main',
    components: {
        SideMenu,
        HeaderBar
    },

    data() {
        return {
            collapsed: false,
            minLogo,
            maxLogo,
        }
    },

    computed: {
        menuList() {
            return getMenuListFromLocalstorage()
        },
    },

    methods: {
        ...mapMutations([
            'setBreadCrumb',
        ]),
        turnToPage(route) {
            
        },
        handleCollapsedChange(state) {
            console.log(state)
            this.collapsed = state
        }
    },

    mounted() {
        this.setBreadCrumb(this.$route)
    }
}
</script>
