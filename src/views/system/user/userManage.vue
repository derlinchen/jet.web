<template>
    <Card>
        <div class="search-con search-con-top">
            <Form inline :label-width="100">
                <FormItem label="用户编号：">
                    <Input clearable placeholder="输入用户编号" class="search-input" v-model="userCode" />
                </FormItem>
                <FormItem label="用户名称：">
                    <Input clearable placeholder="输入用户名称" class="search-input" v-model="userName" />
                </FormItem>
                <Button @click="searchUser" class="search-btn" type="primary">
                    查询
                </Button>
            </Form>
        </div>

        <Table border ref="selection" :columns="columns" :data="tableData" @on-selection-change="columnSelectChange">
        </Table>
        <div style="margin-top:10px">
            <Page :total="page.total" :page-size="page.pageSize" show-total show-elevator show-sizer
                :page-size-opts="[10, 20, 30, 40, 50, 60, 70, 80]" @on-change="pageChange"
                @on-page-size-change="pageSizeChange" />
        </div>

        

    </Card>

</template>

    
<script>
import './index.less'
import {
    searchUser
} from '@/api/userManage'

export default {
    name: 'userManage',
    data() {
        return {
            userCode: '',
            userName: '',
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户编号',
                    key: 'userCode'
                },
                {
                    title: '用户名称',
                    key: 'userName'
                },
                {
                    title: '用户角色',
                    key: 'roleNames'
                },
                {
                    title: '创建人',
                    key: 'createUserName'
                },
                {
                    title: '创建时间',
                    key: 'createDate'
                }
            ],
            tableData: [],
            selectRow: [],
            page: {
                pageNo: 1,
                total: 0,
                pageSize: 10,
            },
            userStatus: [
                {
                    userStatus: '1',
                    userStatusName: '正常'
                },
                {
                    userStatus: '2',
                    userStatusName: '异常'
                }
            ]
        }
    },

    methods: {
        columnSelectChange(row) {
            this.selectRow = row
        },
        searchUser() {
            let param = {
                pageNo: this.page.pageNo,
                pageSize: this.page.pageSize,
                item: {
                    userCode: this.userCode,
                    userName: this.userName
                }
            }
            searchUser(param).then(res => {
                if (res.code === '200') {
                    this.tableData = res.data.list
                    this.page.total = res.data.totalRecords
                    this.pageSize = res.data.pageSize
                }
            })
        },
        pageChange(pageNo) {
            this.page.pageNo = pageNo
            this.searchUser()
        },

        pageSizeChange(pageSize) {
            this.page.pageNo = 1
            this.page.pageSize = pageSize
            this.searchUser()
        }
    },

    // 初次加载调用方法
    mounted() {
        this.searchUser()
    }
}
</script>