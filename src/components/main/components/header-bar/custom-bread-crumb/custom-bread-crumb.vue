<template>
    <!-- 面包屑 -->
    <div class="custom-bread-crumb">
        <Breadcrumb :style="{ fontSize: `${fontSize}px` }">
            <!-- 面包屑内容 -->
            <BreadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
                <common-icon style="margin-right: 4px;" :type="item.icon || ''" />
                {{ showTitle(item) }}
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
import CommonIcon from '@/components/common-icon'
import './custom-bread-crumb.less'
import { showTitle } from '@/libs/util'

export default {

    name: 'customBreadCrumb',
    components: {
        CommonIcon
    },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        fontSize: {
            type: Number,
            default: 14
        },
        showIcon: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showTitle(item) {
            return showTitle(item, this)
        }
    }
}


</script>