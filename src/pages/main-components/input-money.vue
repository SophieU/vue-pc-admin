<template>
    <input type="number" onpaste="return false" ondragenter="return false" oncontextmenu="return false;"  style="ime-mode: disabled ; " :autocomplete="false"  @keydown="validateKey" @input="validateInput"  :value="value"/>
</template>

<script>
    export default {
        name: "input-number",
      props:['value'],
      data(){
        return {
          keyValid:false
        }
      },
      methods:{
        validateKey(keyEvent){
          let key = keyEvent.key;
          let keyReg = /(\d|\.)/;
          let val = this.value?this.value.toString():'';
          //已达2位
          if(keyReg.test(key)){
            let floatNum = val.split('.');
            if(floatNum.length>=2&&floatNum[1].length>=2){
              event.preventDefault();
            }
          }
          //多个小数点
          if(key==='.'&&val.indexOf('.')>-1){
            event.preventDefault();
          }

        },
        validateInput(event){
          let value = event.target.value;
          if(value.length<=0){
            value=null;
          }else{
            value=parseFloat(value);
          }
          this.$emit('input',value);
        },



      }
    }
</script>

<style scoped>
  input{
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    -webkit-tap-highlight-color: transparent;
    transition: all .2s linear;
  }
  input:focus,input:hover{
    border-color: #57a3f3;
    outline:none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
</style>
