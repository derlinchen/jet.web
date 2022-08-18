<template>
    <div class="side-menu-wrapper">
        <!-- 系统logo -->
        <slot></slot>
        <!-- 菜单信息 -->
        <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion"
            :theme="theme" width="auto" @on-select="handleSelect">
            <!-- 菜单处理 -->
            <template v-for="item in menuList">
                <side-menu-item v-if="showChildren(item)" :key="`menu-parent-${item.name}`" :parent-item="item">
                </side-menu-item>
                <menu-item v-else :name="item.name" :key="`menu-${item.name}`">
                    <common-icon :type="item.icon || ''" /><span>{{ item.title }}</span>
                </menu-item>
            </template>
        </Menu>

        <!-- 折叠菜单 -->
        <div class="menu-collapsed" v-show="collapsed" :list="menuList">
            <!-- 遍历折叠菜单处理 -->
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
        // 菜单列表
        menuList: {
            type: Array,
            default() {
                return []
            }
        },
        // 主题
        theme: {
            type: String,
            default: 'dark'
        },

        // 手风琴
        accordion: Boolean,

        // 选中指定菜单
        activeName: {
            type: String,
            default: ''
        },

        // 折叠
        collapsed: {
            type: Boolean
        },

        // 菜单icon大小
        rootIconSize: {
            type: Number,
            default: 20
        },

        // icon大小
        iconSize: {
            type: Number,
            default: 16
        }
    },
    data() {
        return {
            // 手风琴打开子菜单所在的父级菜单组
            openedNames: []
        }
    },
    methods: {
        // 菜单选择
        handleSelect(name) {
            // 调用父级组件的方法--->main.vue中的@on-select
            this.$emit('on-select', name)
        },
        // 打开子菜单所在的父级菜单组，以手风琴的形式打开
        getOpenedNamesByActiveName(name) {
            return this.$route.matched.map(item => item.name).filter(item => item !== name)
        }
    },
    computed: {
        // 设置文字颜色
        textColor() {
            return this.theme === 'dark' ? '#fff' : '#495060'
        }
    },

    // 监听
    watch: {
        // 监听选中的菜单
        activeName(name) {
            if (this.accordion) {
                this.openedNames = this.getOpenedNamesByActiveName(name)
            } else {
                this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
            }
        },
        
        // 打开选中菜单所在的菜单组
        openNames(newNames) {
            this.openedNames = newNames
        },

        // 打开选中菜单所在的菜单组
        openedNames() {
            this.$nextTick(() => {
                this.$refs.menu.updateOpened()
            })
        }
    },

    // 挂载处理
    mounted() {
        this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(this.activeName))
    }
}
</script>

<style lang="less">
@import './side-menu.less';
</style>