<template>
  <div class="top">
    <el-row class="tac">
      <el-col :span="24">
          
        <el-menu default-active="1" mode="horizontal" class="el-menu-vertical-demo" :unique-opened="true"
                 theme="dark" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">{{displayName === -1 ? '未登录' : displayName}}</template>
            <el-menu-item index="1-1">修改密码</el-menu-item>
            <el-menu-item index="1-2">退出</el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>