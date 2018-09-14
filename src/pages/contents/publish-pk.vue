<template>
    <div>
      <Form :label-width="100">
        <FormItem label="小区：">
          <Select>
            <Option value="">状元府</Option>
          </Select>
        </FormItem>
        <FormItem label="标题：">
          <Input placeholder="标题不超过25个汉字" />
        </FormItem>
        <FormItem label="状态：">
          <Select>
            <Option value="">已发布</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
</template>

<script>
    export default {
        name: "publish-pk"
    }
</script>

<style scoped>

</style>
