import CommonIcon from '@/components/common-icon'
import { showTitle } from '@/libs/util'


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