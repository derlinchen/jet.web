<template>
  <!-- 折叠菜单 -->
  <Dropdown ref="dropdown" @on-click="handleClick" :class="hideTitle ? '' : 'collased-menu-dropdown'"
    :transfer="hideTitle" :placement="placement">
    <!-- 折叠菜单icon -->
    <a class="drop-menu-a" type="text" @mouseover="handleMousemove($event, children)"
      :style="{ textAlign: !hideTitle ? 'left' : '' }">
      <common-icon :size="rootIconSize" :color="textColor" :type="parentItem.icon" /><span class="menu-title"
        v-if="!hideTitle">{{ parentItem.title }}</span>
      <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16" />
    </a>
    <!-- 折叠菜单下拉数据 -->
    <template ref="dropdown" v-slot:list>
      <DropdownMenu>
        <!-- 折叠菜单下拉内容 -->
        <template v-for="child in children">
          <collapsed-menu v-if="showChildren(child)" :icon-size="iconSize" :parent-item="child"
            :key="`drop-${child.name}`"></collapsed-menu>
          <DropdownItem v-else :key="`drop-parent-${child.name}`" :name="child.name">
            <common-icon :size="iconSize" :type="child.icon" /><span class="menu-title"> {{ child.title }}</span>
          </DropdownItem>
        </template>
      </DropdownMenu>
    </template>

  </Dropdown>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
import { findNodeUpperByClasses } from '@/libs/util'

export default {
  name: 'CollapsedMenu',
  mixins: [mixin, itemMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    rootIconSize: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      placement: 'right-end'
    }
  },
  methods: {
    // 菜单点击调用
    handleClick(name) {
      this.$emit('on-click', name)
    },

    // 鼠标移动时间处理
    handleMousemove(event, children) {
      const { pageY } = event
      const height = children.length * 38
      const isOverflow = pageY + height < window.innerHeight
      this.placement = isOverflow ? 'right-start' : 'right-end'
    }
  },

  // 挂载
  mounted() {
    let dropdown = findNodeUpperByClasses(this.$refs.dropdown.$el, ['ivu-select-dropdown', 'ivu-dropdown-transfer'])
    if (dropdown) dropdown.style.overflow = 'visible'
  }
}
</script>
