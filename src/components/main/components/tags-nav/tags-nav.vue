<template>
    <div class="tags-nav">
        <div class="close-con">
            <Dropdown transfer @on-click="handleTagsOption" style="margin-top:7px;">
                <Button size="small" type="text">
                    <Icon :size="18" type="ios-close-circle-outline" />
                </Button>
                <template v-slot:list>
                    <DropdownMenu>
                        <DropdownItem name="close-all">关闭所有</DropdownItem>
                        <DropdownItem name="close-others">关闭其他</DropdownItem>
                    </DropdownMenu>
                </template>

            </Dropdown>
        </div>

        <ul v-show="visible" :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }" class="contextmenu">
            <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{ item }}</li>
        </ul>

        <div class="btn-con left-btn">
            <Button type="text" @click="handleScroll(240)">
                <Icon :size="18" type="ios-arrow-back" />
            </Button>
        </div>

        <div class="btn-con right-btn">
            <Button type="text" @click="handleScroll(-240)">
                <Icon :size="18" type="ios-arrow-forward" />
            </Button>
        </div>


        <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
            <div ref="scrollBody" class="scroll-body" :style="{ left: tagBodyLeft + 'px' }">

                <transition-group name="taglist-moving-animation">
                    <Tag type="dot" closable v-for="(item, index) in list" :key="`tag-nav-${index}`" :name="item.name"
                        :data-route-item="item" :color="isCurrentTag(item) ? 'primary' : 'default'"
                        @click.native="handleClick(item)" @on-close="handleClose(item)">
                        {{ showTitleInside(item) }}
                    </Tag>
                    <!-- <Tag type="dot" v-for="(item, index) in list" ref="tagsPageOpened" :key="`tag-nav-${index}`"
                        :name="item.name" :data-route-item="item" @on-close="handleClose(item)"
                        @click.native="handleClick(item)" :closable="item.name !== $config.homeName"
                        :color="isCurrentTag(item) ? 'primary' : 'default'"
                        @contextmenu.prevent.native="contextMenu(item, $event)">{{ showTitleInside(item) }}</Tag> -->
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
        close(route) {
            let res = this.list.filter(item => !routeEqual(route, item))
            this.$emit('on-close', res, undefined, route)
        }
    }
}

</script>

<style lang="less">
@import './tags-nav.less';
</style>
