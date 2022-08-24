<template>
  <div class="user-avatar-dropdown">
    <!-- 个人中心 -->
    <Dropdown @on-click="handleClick">
      <!-- 头像 -->
      <Avatar :src="userAvatar" />
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <template v-slot:list>
        <!-- 下拉选项 -->
        <DropdownMenu>
          <DropdownItem name="logout">退出登录</DropdownItem>
          <DropdownItem name="editPassword">修改密码</DropdownItem>
        </DropdownMenu>
      </template>
    </Dropdown>
  </div>

  <Modal v-model="editPasswordModal" width="640" title="修改密码" @on-ok="editPassword">
    <Form inline :label-width="100">
      <FormItem label="用户编号：">
        <Input disabled v-model="editPasswordParam.userCode" />
      </FormItem>
      <FormItem label="密码">
        <Input type="password" v-model="editPasswordParam.password" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',

  data() {
    return {
      editPasswordModal: false,
      editPasswordParam: {}
    }
  },
  props: {
    userAvatar: {
      type: String,
      default: ''
    }
  },
  methods: {

    ...mapActions([
      'handleLogOut',
      'handleEditPassword'
    ]),

    // 退出登录
    logout() {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },

    showEditPassword() {
      this.editPasswordModal = true
      this.editPasswordParam = this.$store.getters.getUserInfo
      this.editPasswordParam.password = ''
    },

    editPassword() {
      this.handleEditPassword(this.editPasswordParam).then(res => {
        if (res && res.code === '200') {
          this.$Message['info']({
            background: true,
            content: '修改成功'
          })
          this.$router.push({
            name: 'login'
          })
        }
      })
    },

    handleClick(name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'editPassword': this.showEditPassword()
          break
      }
    }
  }
}
</script>
