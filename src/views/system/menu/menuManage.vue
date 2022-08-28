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

        <Table border :loading="loading" :columns="menuColumns" :data="menuTableData">
        </Table>
        <!-- <div style="margin-top:10px">
            <Page :total="page.total" :page-size="page.pageSize" show-total show-elevator show-sizer
                :page-size-opts="[10, 20, 30, 40, 50, 60, 70, 80]" @on-change="pageChange"
                @on-page-size-change="pageSizeChange" />
        </div> -->
    </Card>
</template>

    
<script>
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
            menuColumns: [
                {
                    title: '菜单标题',
                    key: 'title'
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
            menuTableData:[]
        }
    },
    methods: {
        getMenuList() {

        },
        showAddMenu() {

        },
        showEditMenu() {

        }
    }
}
</script>