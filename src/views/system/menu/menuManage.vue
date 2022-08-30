<template>
    <Card>
        <div>
            <Form inline :label-width="100" style="text-align: right;">
                <FormItem>
                    <Space wrap>
                        <Button @click="refreshMenu" icon="md-refresh" type="primary">
                            刷新
                        </Button>
                        <Button @click="showAddMenu" icon="md-add" type="primary">
                            添加
                        </Button>
                        <Button @click="showEditMenu" icon="md-create" type="primary">
                            修改
                        </Button>
                        <Button @click="deleteMenu" icon="md-trash" type="error">
                            删除
                        </Button>
                    </Space>
                </FormItem>
            </Form>
        </div>

        <Table row-key="id" border :loading="loading" :columns="menuColumns" :data="menuTableData"
            :highlight-row="highlightRow" @on-row-click="menuRowClick">
        </Table>

        <Modal v-model="modalStatus" width="700" :title="modalTitle" @on-ok="sumbitMenuModal">
            <Form inline :label-width="100">
                <FormItem label="父级菜单" v-if="modalType === 'edit'">
                    <Input clearable v-model="paramData.parentTitle" style="width: 220px" disabled />
                </FormItem>
                <FormItem label="父级菜单" v-else>
                    <TreeSelect v-model="paramData.parentId" :data="parentMenuList" style="width: 220px" />
                </FormItem>
                <FormItem label="菜单标题">
                    <Input clearable v-model="paramData.title" style="width: 220px" />
                </FormItem>
            </Form>
            <Form inline :label-width="100">
                <FormItem label="路由名称">
                    <Input clearable v-model="paramData.name" style="width: 220px" />
                </FormItem>
                <FormItem label="菜单图标">
                    <Input clearable v-model="paramData.icon" style="width: 220px" />
                </FormItem>
            </Form>
            <Form inline :label-width="100">
                <FormItem label="路由URL">
                    <Input clearable v-model="paramData.url" style="width: 220px" />
                </FormItem>

            </Form>
        </Modal>
    </Card>
</template>

    
<script>
import {
    getSysMenuList,
    deleteSysMenu,
    getSysMenu,
    getSysMenuSelect
} from '@/api/menuManage'
import * as tools from '@/libs/tools'

export default {
    name: 'menuManage',
    data() {
        return {
            search: {
                pageNo: 1,
                total: 0,
                pageSize: 10,
                item: {}
            },
            loading: false,
            highlightRow: true,
            menuColumns: [
                {
                    title: '菜单标题',
                    key: 'title',
                    tree: true
                },
                {
                    title: '路由名称',
                    key: 'name'
                },
                {
                    title: '菜单图标',
                    key: 'icon'
                },
                {
                    title: '菜单URL',
                    key: 'url'
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
            menuTableData: [],
            selectRow: {},
            modalStatus: false,
            modalTitle: '',
            // 弹窗类型
            modalType: '',
            paramData: {
                parentId: ''
            },
            parentMenuList: []
        }
    },
    methods: {
        refreshMenu() {
            this.getMenuList()
        },
        getMenuList() {
            this.selectRow = {}
            this.loading = true
            const param = {}
            getSysMenuList(param).then(res => {
                if (res && res.code === '200') {
                    this.menuTableData = res.data
                }
                this.loading = false
            })
        },
        showAddMenu() {
            this.modalStatus = true
            this.modalTitle = '新增菜单'
            this.modalType = 'add'
        },
        showEditMenu() {
            if (Object.keys(this.selectRow).length === 0) {
                tools.error('请选则修改的菜单')
                return
            }
            this.modalStatus = true
            this.modalTitle = '修改菜单'
            this.modalType = 'edit'
            this.paramData = JSON.parse(JSON.stringify(this.selectRow))

            const param = {
                id: this.selectRow.parentId
            }
            getSysMenu(param).then(res => {
                if (res && res.code === '200') {
                    this.paramData.parentTitle = res.data.title
                }
            })

        },
        deleteMenu() {
            if (Object.keys(this.selectRow).length === 0) {
                tools.error('请选则删除的菜单')
                return
            }
            const param = {
                ids: this.selectRow.ids
            }
            deleteSysMenu(param).then(res => {
                if (res && res.code === '200') {
                    tools.info("删除成功");
                }
                this.getMenuList()
            })
        },
        menuRowClick(row) {
            this.selectRow = row
        },
        sumbitMenuModal() {

        },
        getMenuSelect() {
            getSysMenuSelect().then(res => {
                if (res && res.code === '200') {
                    console.log(res.data)
                    this.parentMenuList = res.data
                }
            })
        }

    },
    created() {
        this.getMenuSelect()
        this.getMenuList()
    }
}
</script>