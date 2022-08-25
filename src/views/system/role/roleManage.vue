<template>
    <Card>
        <div>
            <Form inline :label-width="100">
                <FormItem label="角色编号：">
                    <Input clearable placeholder="输入角色编号" v-model="search.item.roleCode" />
                </FormItem>
                <FormItem label="角色名称：">
                    <Input clearable placeholder="输入角色名称" v-model="search.item.roleName" />
                </FormItem>

                <Space wrap>
                    <Button @click="searchRole" icon="md-search" type="primary">
                        查询
                    </Button>
                    <Button @click="showAddRoleModal" icon="md-add" type="primary">
                        新增
                    </Button>
                    <Button @click="bindMenu" icon="md-repeat" type="primary">
                        绑定菜单
                    </Button>
                    <Button @click="deleteRoles" icon="md-trash" type="error">
                        删除
                    </Button>
                </Space>

            </Form>
        </div>

        <Table border :loading="loading" ref="selection" :columns="columns" :data="tableData"
            @on-selection-change="columnSelectChange">
            <template #action="{ row }">
                <Button type="primary" size="small" style="margin-right: 5px"
                    @click="showEditRoleModal(row)">编辑</Button>
                <Button type="error" size="small" @click="deleteRole(row)">删除</Button>
            </template>
        </Table>

        <div style="margin-top:10px">
            <Page :total="search.total" :page-size="search.pageSize" show-total show-elevator show-sizer
                :page-size-opts="[10, 20, 30, 40, 50, 60, 70, 80]" @on-change="pageChange"
                @on-page-size-change="pageSizeChange" />
        </div>

        <Modal v-model="modalStatus" width="700" :title="modalTitle" @on-ok="sumbitRoleModal">
            <Form inline :label-width="100">
                <FormItem label="角色编号：">
                    <Input clearable v-model="paramData.roleCode" style="width: 220px" />
                </FormItem>
                <FormItem label="角色名称">
                    <Input clearable v-model="paramData.roleName" style="width: 220px" />
                </FormItem>
            </Form>
        </Modal>

    </Card>
</template>

    
<script>
import { searchSysRole, deleteSysRole, saveSysRole, updateSysRole, deleteSysRoles } from '@/api/roleManage'

export default {
    name: 'roleManage',
    data() {
        return {
            search: {
                pageNo: 1,
                total: 0,
                pageSize: 10,
                item: {}
            },
            loading: false,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '角色编号',
                    key: 'roleCode'
                },
                {
                    title: '角色名称',
                    key: 'roleName'
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
            paramData: {},
            modalStatus: false,
            modalTitle: '',
            modalType: ''
        }
    },
    methods: {
        searchRole() {
            this.loading = true
            searchSysRole(this.search).then(res => {
                if (res && res.code === '200') {
                    this.tableData = res.data.list
                    this.search.total = res.data.totalRecords
                    this.search.pageSize = res.data.pageSize
                }
                this.loading = false
            })
        },
        showAddRoleModal() {
            this.modalStatus = true
            this.modalTitle = '新增角色'
            this.modalType = 'add'
            this.paramData = {}
        },
        showEditRoleModal(row) {
            this.modalStatus = true
            this.modalTitle = '修改角色'
            this.modalType = 'edit'
            this.paramData = JSON.parse(JSON.stringify(row))
        },
        deleteRoles() {
            let ids = this.selectRow.map(item => {
                return item.id
            })

            deleteSysRoles(ids).then(res => {
                if (res && res.code === '200') {
                    this.$Message['info']({
                        background: true,
                        content: '删除成功'
                    })
                }
                this.search.pageNo = 1
                this.searchRole()
            })
        },
        deleteRole(row) {
            const param = {
                id: row.id
            }

            deleteSysRole(param).then(res => {
                if (res && res.code === '200') {
                    this.$Message['info']({
                        background: true,
                        content: '删除成功'
                    })
                }
                this.search.pageNo = 1
                this.searchRole()
            })
        },
        columnSelectChange(row) {
            this.selectRow = row
        },
        pageChange(pageNo) {
            this.search.pageNo = pageNo
            this.searchRole()
        },
        pageSizeChange(pageSize) {
            this.search.pageNo = 1
            this.search.pageSize = pageSize
            this.searchRole()
        },
        sumbitRoleModal() {
            if (this.modalType === 'add') {
                saveSysRole(this.paramData).then(res => {
                    if (res && res.code === '200') {
                        this.$Message['info']({
                            background: true,
                            content: '保存成功'
                        })
                    }
                    this.searchRole()
                })
            } else {
                updateSysRole(this.paramData).then(res => {
                    if (res && res.code === '200') {
                        this.$Message['info']({
                            background: true,
                            content: '修改成功'
                        })
                    }
                    this.searchRole()
                })
            }
        }
    },
    created() {
        this.searchRole()
    }
}
</script>