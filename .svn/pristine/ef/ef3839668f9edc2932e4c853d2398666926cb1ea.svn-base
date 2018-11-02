<template>
    <Modal title="新建工单" v-model="showModal">
        <div class="modal_wrap_form">
          <Form label-position="top">
            <FormItem label="一生约绑定手机（非必填）">

            </FormItem>
          </Form>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "new-order",
        props:{
          show:Boolean,
        },
      data(){
        return {
          test:1,
        }
      },
        computed:{
            showModal:{
                get:function(){
                  return this.show;
                },
                set:function(){
                  this.$emit('close');
                }
            }
        }
    }
</script>

<style scoped>

</style>
