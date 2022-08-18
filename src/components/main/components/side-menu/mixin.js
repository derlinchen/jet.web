import CommonIcon from '@/components/common-icon'


export default {
    components: {
        CommonIcon
    },
    methods: {
        // 是否展示子菜单
        showChildren(item) {
            return item.children && item.children.length > 0
        }
    }
}