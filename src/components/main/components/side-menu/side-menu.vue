<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion"
            :theme="theme" width="auto" @on-select="handleSelect">
            <template v-for="item in menuList">
                <side-menu-item v-if="showChildren(item)" :key="`menu-parent-${item.name}`" :parent-item="item">
                </side-menu-item>
                <menu-item v-else :name="item.name" :key="`menu-${item.name}`">
                    <common-icon :type="item.icon || ''" /><span>{{ item.title }}</span>
                </menu-item>
            </template>
        </Menu>
    </div>
</template>

<script>
import mixin from './mixin'
import SideMenuItem from './side-menu-item.vue'

export default {
    name: 'SideMenu',
    mixins: [mixin],
    components: {
        SideMenuItem
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
        }
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