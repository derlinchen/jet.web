<template>
    <!-- 菜单组件 -->
    <Submenu :name="`${parentName}`">
        <template v-slot:title>
            <common-icon :type="parentItem.icon || ''" />
            <span>{{ parentItem.title }}</span>
        </template>
        <template v-for="item in children">
            <side-menu-item v-if="showChildren(item)" :key="`menu-parent-${item.name}`" :parent-item="item">
            </side-menu-item>
            <menu-item v-else :name="item.name" :key="`menu-${item.name}`">
                <common-icon :type="item.icon || ''" /><span>{{ item.title }}</span>
            </menu-item>
        </template>
    </Submenu>
</template>

<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
export default {
    name: 'SideMenuItem',
    mixins: [mixin, itemMixin]
}
</script>