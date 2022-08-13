<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
                1111

        </Sider>

        <Layout>
            <Header class="header-con">

            </Header>

            <Content class="main-content-con">
                
            </Content>
        </Layout>
    </Layout>
</template>



<script>
import './main.less'

export default {
    name: 'Main'
}
</script>
