<template>
    <!-- 系统头部 -->
    <div class="header-bar">
        <!-- 折叠菜单触发空间 -->
        <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
        <!-- 面包屑 -->
        <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>
        <!-- 个人中心 -->
        <div class="custom-content-con">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
    name: 'HeaderBar',
    components: {
        siderTrigger,
        customBreadCrumb
    },
    props: {
        collapsed: Boolean
    },
    computed: {
        breadCrumbList() {
            return this.$store.state.app.breadCrumbList
        }
    },
    methods: {
        handleCollpasedChange(state) {
            this.$emit('on-coll-change', state)
        }
    }
}
</script>