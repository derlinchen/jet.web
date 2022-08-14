<template>
    <div class="header-bar">
        <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
    </div>
</template>

<script>
import siderTrigger from './sider-trigger'

export default {
    name: 'HeaderBar',
    components: {
        siderTrigger
    },
    props: {
        collapsed: Boolean
    },

    methods: {
        handleCollpasedChange(state) {
            this.$emit('on-coll-change', state)
        }
    }
}
</script>