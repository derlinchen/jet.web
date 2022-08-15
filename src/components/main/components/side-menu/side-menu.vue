<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
            <template v-for="item in menuList">
                <side-menu-item v-if="showChildren(item)" :key="`menu-parent-${item.name}`" :parent-item="item">
                </side-menu-item>
                <menu-item v-else :name="item.name" :key="`menu-${item.name}`">
                    <common-icon :type="item.icon || ''" /><span>{{ item.title }}</span>
                </menu-item>
            </template>
        </Menu>

        <div class="menu-collapsed" v-show="collapsed" :list="menuList">
            <template v-for="item in menuList">
                <collapsed-menu v-if="item.children && item.children.length > 0" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
                <Tooltip transfer v-else :content="item.title" placement="right" :key="`drop-menu-t-${item.name}`">
                    <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}"><common-icon :size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon)"/></a>
                </Tooltip>
            </template>
        </div>
    </div>
</template>

<script>
import mixin from './mixin'
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'

export default {
    name: 'SideMenu',
    mixins: [mixin],
    components: {
        SideMenuItem,
        CollapsedMenu
    },
    props: {
        menuList: {
            type: Array,
            default() {
                return []
            }
        },
        theme: {
            type: String,
            default: 'dark'
        },
        activeName: {
            type: String,
            default: ''
        }, collapsed: {
            type: Boolean
        },
    },

    computed: {
        textColor() {
            return this.theme === 'dark' ? '#fff' : '#495060'
        }
    },

    mounted() {
        // console.log(collapsed)
    }

}
</script>

<style lang="less">
@import './side-menu.less';
</style>