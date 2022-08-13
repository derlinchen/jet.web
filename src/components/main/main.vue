<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
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

            </Header>

            <Content class="main-content-con">

            </Content>
        </Layout>
    </Layout>
</template>



<script>
import './main.less'
import { getMenuListFromLocalstorage } from '@/libs/util'

import SideMenu from './components/side-menu'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'


export default {
    name: 'Main',
    components: {
        SideMenu
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
            alert(1)
            console.log(getMenuListFromLocalstorage())
            return getMenuListFromLocalstorage()
        },
    },

    methods: {
        turnToPage(route) {
        }
    }
}
</script>
