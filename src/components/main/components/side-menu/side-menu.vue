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

        <div class="menu-collapsed" v-show="collapsed" :list="menuList">
            <template v-for="item in menuList">
                <collapsed-menu v-if="item.children && item.children.length > 0" @on-click="handleSelect" hide-title
                    :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item"
                    :key="`drop-menu-${item.name}`"></collapsed-menu>
                <Tooltip transfer v-else :content="item.title" placement="right" :key="`drop-menu-t-${item.name}`">
                    <a @click="handleSelect(item.name)" class="drop-menu-a" :style="{ textAlign: 'center' }">
                        <common-icon :size="rootIconSize" :color="textColor"
                            :type="item.icon || (item.children && item.children[0].icon)" />
                    </a>
                </Tooltip>
            </template>
        </div>
    </div>
</template>

<script>
import mixin from './mixin'
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import { getUnion } from '@/libs/tools'

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
        accordion: Boolean,
        activeName: {
            type: String,
            default: ''
        }, collapsed: {
            type: Boolean
        },
        rootIconSize: {
            type: Number,
            default: 20
        },
        iconSize: {
            type: Number,
            default: 16
        },
    },
    data() {
        return {
            openedNames: []
        }
    },
    methods: {
        handleSelect(name) {
            // 调用父级组件的方法
            this.$emit('on-select', name)
        },
        getOpenedNamesByActiveName(name) {
            return this.$route.matched.map(item => item.name).filter(item => item !== name)
        },
    },
    computed: {
        textColor() {
            return this.theme === 'dark' ? '#fff' : '#495060'
        }
    },
    watch: {
        activeName(name) {
            if (this.accordion) {
                this.openedNames = this.getOpenedNamesByActiveName(name)
            } else {
                this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
            }
        },
        openNames(newNames) {
            this.openedNames = newNames
        },
        openedNames() {
            this.$nextTick(() => {
                this.$refs.menu.updateOpened()
            })
        }
    },
    mounted() {
        this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(this.activeName))
    }
}
</script>

<style lang="less">
@import './side-menu.less';
</style>