<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion"
            :theme="theme" width="auto" @on-select="handleSelect">
            <template v-for="item in menuList">
                {{item.name}}
            </template>
        </Menu>
    </div>
</template>

<script>
export default {
    name: 'SideMenu',

    props: {
        menuList: {
            type: Array,
            default() {
                return []
            }
        },
    },

    computed: {
        textColor() {
            return this.theme === 'dark' ? '#fff' : '#495060'
        }
    }

}
</script>

<style lang="less">
@import './side-menu.less';
</style>