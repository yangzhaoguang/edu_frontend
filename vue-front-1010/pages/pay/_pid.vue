<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt">
          <span class="success-icon"></span
          ><span class="success-info"
            >订单提交成功，请您及时付款！订单号：{{ payObj.out_trade_no }}</span
          >
        </h4>
        <span class="fr"
          ><em class="sui-lead">应付金额：</em
          ><em class="orange money">￥{{ payObj.total_fee }}</em></span
        >
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url" :size="338" />
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
      </div>
    </div>
  </div>
</template>

<script>
import orderApi from '~/api/order'
export default {
    data() {
        return {
            orderNo: '',
            payObj: {},  // 保存
            timer1: '' ,// 定时器
            timeCount: 0
        }
    },
    created() {
                //  从路径中取值
        if(this.$route.params.pid) {
            this.orderNo = this.$route.params.pid
            console.log("****" + this.orderNo)
        }
        this.createPayCode()
    },
    methods: {
        createPayCode(){
            orderApi.createNative(this.orderNo).then(response => {
                 console.log(response)
                //  保存支付的一些信息
                this.payObj = response.data.data
               
            })
        },
        //  查询支付状态
        // out_trade_no： 订单号
        queryPayStatus(out_trade_no) {
            console.log(this.timeCount)
            orderApi.getPayStatus(out_trade_no).then(response => {
                // 判断是否支付成功
                if (response.data.success) {
                    this.timeCount = 0
                    // 支付成功，清除定时器
                    clearInterval(this.timer1)
                    this.$message({
                        type: 'success',
                        message: '支付成功!'
                    })
                    //跳转到课程详情页面观看视频
                this.$router.push({path: '/course/' + this.payObj.course_id})
                }else{
                    // 支付中
                    if(this.timeCount == 6000) {
                    // 超时未支付，清空计时器
                    clearInterval(this.timer1)
                    // 超过 30s未支付，跳转课程详情界面
                    this.$message({
                        type: 'error',
                        message: '超时未支付'
                    })
                    //跳转到课程详情页面观看视频
                    this.$router.push({path: '/course/' + this.payObj.course_id})
                    this.timeCount = 0

                    }
                }
            })
        }
        
    },

    mounted() {
      //在页面渲染之后执行
      //每隔三秒，去查询一次支付状态
      this.timer1 = setInterval(() => {
        //  每次查询 timeCount+1
        this.timeCount += 3
        this.queryPayStatus(this.payObj.out_trade_no)
      }, 3000);
    },
}
</script>