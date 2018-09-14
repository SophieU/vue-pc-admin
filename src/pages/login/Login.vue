<template>
    <div class="login-page">
      <div class="login-container">
        <div class="login-left">
          <img src="./logo03.png" alt="">
          <h4>物业管理后台</h4>
        </div>
        <div class="login-right">
          <transition name="fade">
            <div class="login-box" v-if="now==='login'||now==='register'">
              <Form ref="loginForm" :model="formLogin" :rules="ruleLogin">
                <FormItem label="Telephone" prop="username">
                  <!--<Icon type="person"></Icon>-->
                  <Input placeholder="请输入账户信息"   :maxlength="11"  type="text" v-model="formLogin.username">
                    <span slot="prepend" class="login-ico"> <Icon type="person"></Icon></span>
                  </Input>
                </FormItem>
                <FormItem label="Password" prop="password">
                  <Input placeholder="请输入密码" type="password" v-model="formLogin.password">
                    <span slot="prepend" class="login-ico"><Icon type="ios-locked"></Icon></span>
                  </Input>
                </FormItem>
                <transition name="slide-fade">
                  <FormItem label="Code"  v-if="now==='register'" prop="authCode">
                    <Input placeholder="请输入验证" type="password" v-model="formLogin.password">
                    <span slot="prepend" class="login-ico"><Icon type="outlet"></Icon></span>
                    <span slot="append" class="code-btn">
                    <Button  type="primary" :loading="getCoding" @click="getCodingHandle">验证码</Button>
                  </span>
                    </Input>
                  </FormItem>
                </transition>

                <FormItem>
                  <Button type="primary" long @click="validateLogin">登录</Button>
                  <Row>
                    <Col span="12" offset="12" class-name="text-right">
                      <Button type="text" @click="togglePanel('forget')">忘记密码？</Button>
                    </Col>
                  </Row>
                </FormItem>
              </Form>
            </div>
          </transition>
          <!--忘记密码-->
          <transition name="fade">
            <div class="forget-box" v-show="now==='forget'||now==='next'">
              <Form ref="forgetForm" :model="formLogin">

                <div v-show="now==='forget'">
                  <FormItem label="Telephone">
                    <!--<Icon type="person"></Icon>-->
                    <Input placeholder="请输入手机号"  :maxlength="11" type="text" v-model="forgetForm.username">
                    <span slot="prepend" class="login-ico"> <Icon type="person"></Icon></span>
                    </Input>
                  </FormItem>
                  <FormItem label="Code" >
                    <Input placeholder="请输入验证码" type="password" v-model="forgetForm.authCode">
                    <span slot="prepend" class="login-ico"><Icon type="outlet"></Icon></span>
                    <span slot="append" class="code-btn">
                    <Button  type="primary" @click="getCodingHandle" :loading="getCoding">验证码</Button>
                  </span>
                    </Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" long @click="togglePanel('next')">下一步</Button>
                  </FormItem>
                </div>
                <transition name="slide-fade">
                  <div v-show="now==='next'">
                    <FormItem label="Password">
                      <Input placeholder="请输入新密码" type="password" v-model="forgetForm.newPwd">
                      <span slot="prepend" class="login-ico"><Icon type="ios-locked"></Icon></span>
                      </Input>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" long>确认</Button>
                    </FormItem>
                  </div>
                </transition>

                <div >
                  <Row>
                    <Col span="12" offset="12" class-name="text-right">
                      <Button type="text" @click="togglePanel('login')"><span class="back"><Icon type="chevron-left"></Icon> 返回登录</span></Button>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </transition>

          <div class="toggle-login" v-show="now==='login'||now==='register'">
             <span ref="toLogin" class="active"  @click="togglePanel('login')">登录</span>
             <span class="split">|</span>
             <span ref="toRegister" @click="togglePanel('register')">注册</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import iView from 'iview'
  import Cookie from 'js-cookie'

    export default {
        name: "Login",
        data:()=>{
          //自定义验证手机号
          const validateTel=(rule,value,callback)=>{
            let telReg = /^1[3456789]\d{9}/;
            if(!telReg.test(value)){
              callback(new Error('请输入正确的手机号码'))
            }else{
              callback();
            }
          }
          return {
            formLogin:{
              username:'13708044289',
              password:'123456',
              authCode:'',
            },
            ruleLogin:{
              username:[
                {required:true,message:'请输入手机号',trigger:'blur'},
                {validator:validateTel,trigger:'blur'},
              ],
              password:[
                {required:true,message:'请输入密码',trigger:'blur'},
                {type:'string',min:6,message:'密码至少6位'}
              ],
              authCode:[
                {required:true,message:'请输入验证码',trigger:'blur'},
                {type:'number',min:4,message:'至少4位'}
              ]
            },
            forgetForm:{
              username:'',
              authCode:'',
              newPwd:'',
            },
            now:'login',
            getCoding:false, //验证码获取中
          }
        },
      methods:{
        togglePanel(type){
          switch(type){
            case 'register':
              this.$refs.toRegister.className="active";
              this.$refs.toLogin.className="";
              this.now='register';
              break;
            case 'login':
              this.$refs.toRegister.className="";
              this.$refs.toLogin.className="active";
              this.now='login';
              break;
            case 'forget':
              this.now='forget';
              break;
            case 'next':
              this.now='next';
              break;
          }
        },
        getCodingHandle(){
          //获取验证码
          this.getCoding=true;
          setTimeout(()=>{
            this.getCoding=false;
          },1000)
        },
        //验证登录
        validateLogin(){
          this.$refs.loginForm.validate((valid)=>{
            console.log(valid)
            if(valid){
              let tel = this.formLogin.username;
              let password = this.formLogin.password;
              iView.LoadingBar.start();
              Cookie.set('user',tel);
              this.$Message.success('登录成功');
              setTimeout(()=>{
                this.$router.push({name:'home'})
                iView.LoadingBar.finish();
              },1000)
            }else{
              this.$Message.error('输入有误，请重试')
            }
          })
          //验证忘记密码


        }
      },
    }
</script>

<style scoped lang="scss">
.login-page{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url('./bg.jpg') no-repeat center center;
  background-size:100% 100%;
  .login-container{
    width: 567px;
    height: 478px;
    background: url('./login.png') no-repeat center center;
    background-size:100% 100%;
    position: absolute;
    top: 15%;
    right: 10%;
    //transform:translate(0,-70%);
    box-sizing: border-box;
    padding: 18px;
    display: flex;
  }
  .login-left{
    vertical-align: top;
    width: 246px;
    padding-top:130px;
    height: 100%;
    img{
      display: block;
      margin: 0 auto;
      width: 80%;
    }
    h4{
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin-top: 15px;
      letter-spacing: 2px;
    }
  }
  .login-right{
    flex: 1;
    /*width: 275px;*/
    height: 100%;
    box-sizing: border-box;
    position: relative;
    .login-box,.forget-box{
      width: 100%;
      padding: 15px;

      position: absolute;
      top: 50%;
      transform:translate(0,-50%)
    }
    .toggle-login{
      position: absolute;
      bottom: 20px;
      text-align: center;
      font-size: 14px;
      left: 0;
      right: 0;
      color: #ccc;
      span{
        padding: 0 10px;
        user-select: none;
        cursor: pointer;
      }
      .split{
        cursor: default;
      }
      .active{
        color: #039dff;
      }
    }
  }
  .back{
    color: #ccc;
    font-size: 14px;
    transition:all .3s linear;
    &:hover{
      color: #039dff;
    }
  }
}

</style>
