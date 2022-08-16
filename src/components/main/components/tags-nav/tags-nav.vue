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
                    <Tag type="dot" v-for="(item, index) in list">
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
import { showTitle } from '@/libs/util'

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
    methods: {
        showTitleInside(item) {
            return showTitle(item, this)
        },
    },
    mounted() {
        console.log(this.list)
    }
}

</script>

<style lang="less">
@import './tags-nav.less';
</style>
