<template>
  <el-form ref="form" v-loading.body="isLoading" :model="form" label-width="80px">
    <el-row :gutter="0">
      <el-col :span="18">
        <el-form-item v-for="(item, index) in prevItems" :key="item.id" :label="item.label">
          <el-input v-if="item.type === 'input'" :placeholder="item.description || ''" v-model="form[item.prop]"></el-input>
          <markdown v-if="item.type === 'markdown'" v-model="form[item.prop]" :toc="form[item.subProp]" @change="form[item.subProp] = arguments[0]"></markdown>
          <el-radio v-if="item.type === 'radio'" v-model="form[item.prop]" :label="item.label"></el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="20px">
          <el-button :class="{ 'margin-left': true }" type="info" @click.native="jump('prev')"><i class="el-icon-d-arrow-left"></i></el-button>
          <el-button type="info" @click.native="jump('next')"><i class="el-icon-d-arrow-right"></i></el-button>
        </el-form-item>
        <el-form-item label-width="20px">
          <el-button :class="{ 'margin-left': true }" type="info" @click.native="onSaveToc">生成目录 </el-button>
          <el-button type="success" @click.native="onSubmit">提交文章 </el-button>
        </el-form-item>
        <el-form-item v-for="(item, index) in nextItems" :key="item.id" :label="item.label">

          <markdown v-if="item.type === 'markdown'" v-model="form[item.prop]"></markdown>

          <el-date-picker 
              v-if="item.type === 'date-picker'"
              type="datetime" v-model="form[item.prop]"
              placeholder="选择日期时间">
          </el-date-picker>

          <el-select v-if="item.type === 'select'" v-model="form[item.prop]" multiple>
            <el-option
              v-for="tag in tags"
              :label="tag"
              :key="tag.id"
              :value="tag">
            </el-option>            
          </el-select>

          <el-select v-if="item.type === 'radio'" v-model="form[item.prop]">
            <el-option
              v-for="cate in cates"
              :label="cate"
              :key="cate.id"
              :value="cate">
            </el-option>            
          </el-select>

          <el-switch v-if="item.type === 'switch'" v-model="form[item.prop]"></el-switch>

        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
// import moment from 'moment'

export default {
  name: 'post',
  props: ['options'],
  data() {
    let isPost = this.options.name === 'post'
    let isPage = this.options.name === 'page'
    let id = typeof this.$route.params.id === 'undefined' ? -1 : this.$route.params.id
    let form = this.options.items.reduce((prev, curr) => {
      prev[curr.prop] = Array.isArray(curr.default) ? curr.default.map(value => value) : curr.default
      return prev
    }, {})
    form.type = this.options.name
    return {
      isPost,
      isPage,
      cates: [],
      tags: [],
      form,
      id,
      test: '',
      isLoading: id !== -1,
      markdownChecked: false
    }
  },
  computed: {
    splitIndex() {
      return this.options.items.reduce((prev, curr, index) => {
        if (curr.type === 'split') {
          return index
        }
        return prev
      }, -1)
    },
    prevItems() {
      return this.options.items.slice(0, this.splitIndex)
    },
    nextItems() {
      return this.options.items.slice(this.splitindex)
    }
  },
  watch: {
    'form.markdownContent': {
      immediate: true,
      handler: function(val, oldVal) {
        if (!val || !this.form.updatedAt) return
        const url = this.$store.state.siteInfo.siteUrl.value
        const path = this.form.pathName
        const key = `${url}|${path}`
        const temp = this.getLS(key) || ''

        const realVal = temp.replace(/\|\d+$/gm, '')
        const matched = temp.match(/\d+$/gm)
        const hitoryTimestamp = parseInt(matched ? matched.slice(-1) : Date.now())
        const currentTimestamp = new Date(this.form.updatedAt).valueOf()
        if (temp !== '' && val !== realVal && this.markdownChecked === false && hitoryTimestamp >= currentTimestamp) {
          this.restore(key, realVal)
        } else if (this.markdownChecked === true) {
          const targetVal = val + `|${Date.now()}`
          this.saveLS(key, targetVal)
        }
        this.markdownChecked = true
      }
    }
  },
  methods: {},
  created() {}
}
</script>

<style lang="scss" scoped>
  .margin-left {
    margin-left: 10px;
  }

  .el-select {
    margin-right: 5px;
  }

  .el-form {
    margin-top: 20px;
  }
</style>