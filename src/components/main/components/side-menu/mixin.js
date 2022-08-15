import CommonIcon from '@/components/common-icon'


export default {
    components: {
        CommonIcon
    },
    methods: {
        showChildren(item) {
            return item.children && item.children.length > 0
        }
    }
}