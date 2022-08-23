<template>
    <div class="tags-nav">
        <!-- 关闭按钮 -->
        <div class="close-con">
            <!-- 关闭出发方法 -->
            <Dropdown transfer @on-click="handleTagsOption" style="margin-top:7px;">
                <!-- 关闭按钮 -->
                <Button size="small" type="text">
                    <Icon :size="18" type="ios-close-circle-outline" />
                </Button>
                <template v-slot:list>
                    <!-- 关闭下拉选项 -->
                    <DropdownMenu>
                        <DropdownItem name="close-all">关闭所有</DropdownItem>
                        <DropdownItem name="close-others">关闭其他</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </div>

        <!-- 右击选项 -->
        <ul v-show="visible" :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }" class="contextmenu">
            <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{ item }}</li>
        </ul>

        <!-- 左滚动按钮 -->
        <div class="btn-con left-btn">
            <Button type="text" @click="handleScroll(240)">
                <Icon :size="18" type="ios-arrow-back" />
            </Button>
        </div>

        <!-- 右滚动按钮 -->
        <div class="btn-con right-btn">
            <Button type="text" @click="handleScroll(-240)">
                <Icon :size="18" type="ios-arrow-forward" />
            </Button>
        </div>

        <!-- tag滚动功能 -->
        <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
            <!-- 滚动控件 -->
            <div ref="scrollBody" class="scroll-body" :style="{ left: tagBodyLeft + 'px' }">
                <!-- 滚动动画 -->
                <transition-group name="taglist-moving-animation">
                    <!-- tag菜单 -->
                    <Tag type="dot" closable v-for="(item, index) in list" :key="`tag-nav-${index}`" :name="item.name"
                        :data-route-item="item" :color="isCurrentTag(item) ? 'primary' : 'default'"
                        @click.native="handleClick(item)" @on-close="handleClose(item)" ref="tagsPageOpened"
                        @contextmenu.prevent.native="contextMenu(item, $event)">
                        {{ showTitleInside(item) }}
                    </Tag>
                </transition-group>
            </div>
        </div>
    </div>
</template>
    
<script>
import { showTitle, routeEqual } from '@/libs/util'

export default {
    name: 'TagsNav',
    props: {
        value: Object,
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },

    data() {
        return {
            tagBodyLeft: 0,
            visible: false,
            contextMenuLeft: 0,
            contextMenuTop: 0,
            menuList: {
                others: '关闭其他',
                all: '关闭所有'
            }
        }
    },

    computed: {
        // 获取当前路由信息
        currentRouteObj() {
            const { name, params, query } = this.value
            return { name, params, query }
        }
    },
    
    methods: {
        // 展示tag标题信息
        showTitleInside(item) {
            return showTitle(item, this)
        },

        // 判断是否为当前tag
        isCurrentTag(item) {
            return routeEqual(this.currentRouteObj, item)
        },

        // 对tag进行滚动鼠标操作
        handlescroll(e) {
            var type = e.type
            let delta = 0
            if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
            }
            this.handleScroll(delta)
        },

        // 对tag进行滚动操作
        handleScroll(offset) {
            const outerWidth = this.$refs.scrollOuter.offsetWidth
            const bodyWidth = this.$refs.scrollBody.offsetWidth
            if (offset > 0) {
                this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
            } else {
                if (outerWidth < bodyWidth) {
                    if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
                        this.tagBodyLeft = this.tagBodyLeft
                    } else {
                        this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
                    }
                } else {
                    this.tagBodyLeft = 0
                }
            }
        },

        // 点击tag进行菜单切换
        handleClick(item) {
            this.$emit('input', item)
        },

        // 对tag进行关闭操作
        handleClose(current) {
            this.close(current)
        },

        // 关闭tag
        close(route) {
            let res = this.list.filter(item => !routeEqual(route, item))
            this.$emit('on-close', res, undefined, route)
        },

        // 右击tag
        handleTagsOption(type) {
            if (type.includes('all')) {
                // 关闭所有，除了index
                let res = this.list.filter(item => item.name === this.$config.indexName)
                this.$emit('on-close', res, 'all')
            } else if (type.includes('others')) {
                // 关闭除当前页和home页的其他页
                let res = this.list.filter(item => routeEqual(this.currentRouteObj, item) || item.name === this.$config.indexName)
                this.$emit('on-close', res, 'others', this.currentRouteObj)
                setTimeout(() => {
                    this.getTagElementByRoute(this.currentRouteObj)
                }, 100)
            }
        },

        // 根据路由获取tag元素
        getTagElementByRoute(route) {
            this.$nextTick(() => {
                this.refsTag = this.$refs.tagsPageOpened
                this.refsTag.forEach((item, index) => {
                    if (routeEqual(route, item.$attrs['data-route-item'])) {
                        let tag = this.refsTag[index].$el
                        this.moveToView(tag)
                    }
                })
            })
        },

        // 移入视图
        moveToView(tag) {
            const outerWidth = this.$refs.scrollOuter.offsetWidth
            const bodyWidth = this.$refs.scrollBody.offsetWidth
            if (bodyWidth < outerWidth) {
                this.tagBodyLeft = 0
            } else if (tag.offsetLeft < -this.tagBodyLeft) {
                // 标签在可视区域左侧
                this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
            } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
                // 标签在可视区域
                this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
            } else {
                // 标签在可视区域右侧
                this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
            }
        },

        // 右击菜单
        contextMenu(item, e) {
            this.visible = true
            const offsetLeft = this.$el.getBoundingClientRect().left
            this.contextMenuLeft = e.clientX - offsetLeft + 10
            this.contextMenuTop = e.clientY - 64
        },

        // 关闭右击菜单
        closeMenu() {
            this.visible = false
        }
    },

    // 监听
    watch: {
        '$route'(to) {
            this.getTagElementByRoute(to)
        },
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        }
    }
}

</script>

<style lang="less">
@import './tags-nav.less';
</style>
