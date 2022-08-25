<template>
    <Card>
        <div>
            <Form inline :label-width="100">
                <FormItem label="菜单编号：">
                    <Input clearable placeholder="输入菜单编号" v-model="search.menuCode" />
                </FormItem>
                <FormItem label="菜单名称：">
                    <Input clearable placeholder="输入菜单名称" v-model="search.menuName" />
                </FormItem>

                <Space wrap>
                    <Button @click="searchMenu" icon="md-search" type="primary">
                        查询
                    </Button>
                    <Button @click="resetSearch" icon="md-refresh" type="primary">
                        重置
                    </Button>
                </Space>

            </Form>
        </div>

        <Table border :loading="loading" :columns="columns" :data="tableData">
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
            search: {},
            loading: false
        }
    },
    methods: {
        searchMenu() {

        },
        resetSearch() {
            this.search = {}
            this.searchMenu()
        }
    }
}
</script>