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

                <Space wrap>
                    <Button @click="searchUser" icon="md-search" type="primary">
                        查询
                    </Button>
                    <Button @click="addUser" icon="md-add" type="primary">
                        新增
                    </Button>
                    <Button @click="deleteUsers" icon="md-trash" type="error">
                        删除
                    </Button>
                </Space>

            </Form>

        </div>

        <Table border ref="selection" :columns="columns" :data="tableData" @on-selection-change="columnSelectChange">
            <template #action="{ row }">
                <Button type="primary" size="small" style="margin-right: 5px" @click="showUser(row)">查看</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="showEditUser(row)">编辑</Button>
                <Button type="error" size="small" @click="deleteUser(row)">删除</Button>
            </template>
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
    searchSysUser,
    deleteSysUser,
    deleteSysUsers
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
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 180,
                    align: 'center'
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
            searchSysUser(param).then(res => {
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
        },
        showEditUser(row) {

        },
        deleteUser(row) {
            let param = {
                id: row.id
            }
            deleteSysUser(param).then(res => {
                if (res.code === '200') {
                    this.$Message['info']({
                        background: true,
                        content: '删除成功'
                    })
                } else {
                    this.$Message['info']({
                        background: true,
                        content: res.message
                    })
                }
                this.searchUser()
            })
        },
        showUser(row) {

        },
        addUser() {

        },
        deleteUsers() {
            if (this.selectRow.length === 0) {
                this.$Message['error']({
                    background: true,
                    content: '请选择要删除的数据'
                })
                return
            }

            let ids = this.selectRow.map(item => {
                return item.id
            })

            deleteSysUsers(ids).then(res => {
               if (res.code === '200') {
                    this.$Message['info']({
                        background: true,
                        content: '删除成功'
                    })
                } else {
                    this.$Message['info']({
                        background: true,
                        content: res.message
                    })
                }
                this.searchUser()
            })
        }
    },

    // 初次加载调用方法
    mounted() {
        this.searchUser()
    }
}
</script>