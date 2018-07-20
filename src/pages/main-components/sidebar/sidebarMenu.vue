<template>
  <Menu ref="sideMenu" :active-name="$route.name" theme="dark" width="auto">
    <Submenu name="1-1">
      <template slot="title">
        <Icon type="user" :size="16"></Icon>
        <span class="layout-text">{{'标题'}}</span>
      </template>
      <template>
        <MenuItem name="1-2">
          <Icon ></Icon>
          <span class="layout-text">内容</span>
        </MenuItem>
      </template>
    </Submenu>
  </Menu>
</template>

<script>
    export default {
        name: "sidebarMenu"
    }
</script>

<style scoped lang="scss">
@import './menu.scss';
</style>
