<template>
    <Card>
        <div class="search-con search-con-top">
            <Form inline :label-width="100">
                <FormItem label="用户编号：">
                    <Input clearable placeholder="输入用户编号" class="search-input" v-model="search.userCode" />
                </FormItem>
                <FormItem label="用户名称：">
                    <Input clearable placeholder="输入用户名称" class="search-input" v-model="search.userName" />
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

        <Table border :loading="loading" ref="selection" :columns="columns" :data="tableData"
            @on-selection-change="columnSelectChange">
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

        <Modal v-model="editModal" width="640" title="修改用户" @on-ok="editUser">
            <Form inline :label-width="100">
                <FormItem label="用户编号：">
                    <Input clearable class="search-input" v-model="edit.userCode" />
                </FormItem>
                <FormItem label="用户名称">
                    <Input clearable class="search-input" v-model="edit.userName" />
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="addModal" width="640" title="用户" @on-ok="saveUser">
            <Form inline :label-width="100">
                <FormItem label="用户编号：">
                    <Input clearable class="search-input" v-model="save.userCode" />
                </FormItem>
                <FormItem label="用户名称">
                    <Input clearable class="search-input" v-model="save.userName" />
                </FormItem>
            </Form>
            <Form inline :label-width="100">
                <FormItem label="用户状态：">
                    <Select v-model="save.userStatus" style="width:185px">
                        <Option v-for="item in userStatusList" :value="item.code" :key="item.code">{{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>

    </Card>

</template>

    
<script>
import './index.less'
import {
    searchSysUser,
    deleteSysUser,
    deleteSysUsers,
    updateSysUser,
    getUserStatusList
} from '@/api/userManage'

import { getSysRoleList } from '@/api/roleManage'

export default {
    name: 'userManage',
    data() {
        return {
            // table loading效果
            loading: false,

            // 查询条件
            search: {
                userCode: '',
                userName: ''
            },

            // 编辑字段
            edit: {},

            // 新增字段
            save: {},

            // 修改弹窗
            editModal: false,

            // 新增弹窗
            addModal: false,

            userStatusList: [],

            // column信息
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

            // 表单信息
            tableData: [],

            // 复选框选中信息
            selectRow: [],

            // 分页信息
            page: {
                pageNo: 1,
                total: 0,
                pageSize: 10,
            }
        }
    },

    methods: {
        columnSelectChange(row) {
            this.selectRow = row
        },
        searchUser() {
            this.loading = true
            let param = {
                pageNo: this.page.pageNo,
                pageSize: this.page.pageSize,
                item: {
                    userCode: this.search.userCode,
                    userName: this.search.userName
                }
            }
            searchSysUser(param).then(res => {
                if (res.code === '200') {
                    this.tableData = res.data.list
                    this.page.total = res.data.totalRecords
                    this.pageSize = res.data.pageSize
                } else {
                    this.$Message['info']({
                        background: true,
                        content: res.message
                    })
                }
                this.loading = false
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
            this.editModal = true
            this.edit = row
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
            this.addModal = true
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
        },

        editUser() {
            updateSysUser(this.edit).then(res => {
                if (res.code === '200') {
                    this.$Message['info']({
                        background: true,
                        content: '修改成功'
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

    created() {
        getUserStatusList().then(res => {
            if (res.code === '200') {
                this.userStatusList = res.data
            }
        })

        getSysRoleList().then(res => {
            console.log(res)
        })
    },

    // 初次加载调用方法
    mounted() {
        this.searchUser()
    }
}
</script>