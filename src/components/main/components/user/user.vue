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
        </DropdownMenu>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    }
  },
  methods: {

    ...mapActions([
      'handleLogOut'
    ]),

    // 退出登录
    logout() {
      // this.handleLogOut().then(() => {
      //   this.$router.push({
      //     name: 'login'
      //   })
      // })
    },
    handleClick(name) {
      switch (name) {
        case 'logout': this.logout()
          break
      }
    }
  }
}
</script>
