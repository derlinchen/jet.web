<template>
    <Card>
        <div>
            <Form inline :label-width="100">
                <FormItem label="用户编号：">
                    <Input clearable placeholder="输入用户编号" v-model="search.item.userCode" />
                </FormItem>
                <FormItem label="用户名称：">
                    <Input clearable placeholder="输入用户名称" v-model="search.item.userName" />
                </FormItem>

                <Space wrap>
                    <Button @click="searchUser" icon="md-search" type="primary">
                        查询
                    </Button>
                    <Button @click="showAddUserModal" icon="md-add" type="primary">
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
                <Button type="primary" size="small" style="margin-right: 5px"
                    @click="showEditUserModal(row)">编辑</Button>
                <Button type="error" size="small" @click="deleteUser(row)">删除</Button>
            </template>
        </Table>
        <div style="margin-top:10px">
            <Page :total="search.total" :page-size="search.pageSize" show-total show-elevator show-sizer
                :page-size-opts="[10, 20, 30, 40, 50, 60, 70, 80]" @on-change="pageChange"
                @on-page-size-change="pageSizeChange" />
        </div>


        <Modal v-model="modalStatus" width="700" :title="modalTitle" @on-ok="sumbitUserModal">
            <Form inline :label-width="100">
                <FormItem label="用户编号：">
                    <Input clearable v-model="paramData.userCode" style="width: 220px" />
                </FormItem>
                <FormItem label="用户名称">
                    <Input clearable v-model="paramData.userName" style="width: 220px" />
                </FormItem>
            </Form>
            <Form inline :label-width="100">
                <FormItem label="用户状态：">
                    <Select v-model="paramData.userStatus" style="width:220px">
                        <Option v-for="item in userStatusList" :value="item.code" :key="item.code">{{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="角色：">
                    <Select v-model="paramData.roleIdArray" style="width:220px" multiple>
                        <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.roleName }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>

            <Form :label-width="100">
                <FormItem label="用户描述：">
                    <Input v-model="paramData.userDesc" type="textarea" style="width: 550px;" />
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
    getUserStatusList,
    saveSysUser
} from '@/api/userManage'

import { getSysRoleSelect } from '@/api/roleManage'

export default {
    name: 'userManage',
    data() {
        return {
            // table loading效果
            loading: false,

            // 查询条件
            search: {
                pageNo: 1,
                total: 0,
                pageSize: 10,
                item: {}
            },

            // 表单参数
            paramData: {},

            // 用户状态
            userStatusList: [],

            // 角色
            roleList: [],

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
                    title: '用户描述',
                    key: 'userDesc'
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

            // 弹窗状态
            modalStatus: false,

            // 弹窗类型
            modalType: '',

            // 弹窗标题
            modalTitle: ''

        }
    },

    methods: {
        columnSelectChange(row) {
            this.selectRow = row
        },

        searchUser() {
            this.loading = true
            searchSysUser(this.search).then(res => {
                if (res && res.code === '200') {
                    this.tableData = res.data.list
                    this.search.total = res.data.totalRecords
                    this.search.pageSize = res.data.pageSize
                }
                this.loading = false
            })
        },

        pageChange(pageNo) {
            this.search.pageNo = pageNo
            this.searchUser()
        },

        pageSizeChange(pageSize) {
            this.search.pageNo = 1
            this.search.pageSize = pageSize
            this.searchUser()
        },
        
        showEditUserModal(row) {
            this.modalStatus = true
            this.modalTitle = '修改用户'
            this.modalType = 'edit'
            this.paramData = JSON.parse(JSON.stringify(row))
            let roleIds = this.paramData.roleIds
            if (roleIds) {
                this.paramData.roleIdArray = roleIds.split(',')
            }
        },

        showAddUserModal() {
            this.modalStatus = true
            this.modalTitle = '新增用户'
            this.modalType = 'add'
        },

        sumbitUserModal() {
            let roleIdArray = this.paramData.roleIdArray
            if (!roleIdArray || roleIdArray.length === 0) {
                this.$Message['error']({
                    background: true,
                    content: '请选则角色'
                })
                return
            }
            let roleList = this.roleList
            let roleNameArray = []
            roleIdArray.forEach(roleId => {
                roleList.forEach(roleItem => {
                    if (roleId === roleItem.id) {
                        roleNameArray.push(roleItem.roleName)
                    }
                })
            });

            this.paramData.roleIds = roleIdArray.toString()
            this.paramData.roleNames = roleNameArray.toString()

            if (this.modalType === 'add') {
                saveSysUser(this.paramData).then(res => {
                    if (res && res.code === '200') {
                        this.$Message['info']({
                            background: true,
                            content: '保存成功'
                        })
                    }
                    this.save = {}
                    this.searchUser()
                })
            } else {
                updateSysUser(this.paramData).then(res => {
                    if (res && res.code === '200') {
                        this.$Message['info']({
                            background: true,
                            content: '修改成功'
                        })
                    }
                    this.searchUser()
                })
            }
        },

        deleteUser(row) {
            let param = {
                id: row.id
            }
            deleteSysUser(param).then(res => {
                if (res && res.code === '200') {
                    this.$Message['info']({
                        background: true,
                        content: '删除成功'
                    })
                }
                this.search.pageNo = 1
                this.searchUser()
            })
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
                if (res && res.code === '200') {
                    this.$Message['info']({
                        background: true,
                        content: '删除成功'
                    })
                }
                this.search.pageNo = 1
                this.searchUser()
            })
        },
        showUser(row) {

        }
    },

    created() {
        getUserStatusList().then(res => {
            if (res && res.code === '200') {
                this.userStatusList = res.data
            }
        })

        getSysRoleSelect().then(res => {
            if (res && res.code === '200') {
                this.roleList = res.data
            }
        })

        this.searchUser()
    }
}
</script>