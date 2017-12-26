<template>
  <div>
    <NavHead/>
    <BredCrumb>购物车列表</BredCrumb>
      <div class="container">
        <div class="cart">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>My Cart</span></h2>
            </div>
            <div class="item-list-wrap">
                <div class="cart-item">
                    <div class="cart-item-head">
                        <ul>
                            <li>Items</li>
                            <li>Price</li>
                            <li>Quantity</li>
                            <li>Subtotal</li>
                            <li>Edit</li>
                        </ul>
                    </div>
                    <ul class="cart-item-list">
                        <li v-for="item in cartList">
                            <div class="cart-tab-1">
                                <div class="cart-item-check">
                                    <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}" @click="editCart('checked',item)">
                                        <svg class="icon icon-ok">
                    <use xlink:href="#icon-ok"></use>
                  </svg>
                                    </a>
                                </div>
                                <div class="cart-item-pic">
                                    <img :src="'/static/img/'+ item.productImage">
                                </div>
                                <div class="cart-item-title">
                                    <div class="item-name">{{item.productName}}</div>
                                </div>
                            </div>
                            <div class="cart-tab-2">
                                <div class="item-price">{{item.salePrice}}</div>
                            </div>
                            <div class="cart-tab-3">
                                <div class="item-quantity">
                                    <div class="select-self select-self-open">
                                        <div class="select-self-area">
                                            <a class="input-sub" @click="editCart('minu',item)">-</a>
                                            <span class="select-ipt" >{{item.productNum}}</span>
                                            <a class="input-add" @click="editCart('add',item)">+</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cart-tab-4">
                                <div class="item-price-total">{{item.productNum * item.salePrice}}</div>
                            </div>
                            <div class="cart-tab-5">
                                <div class="cart-item-opration">
                                    <a href="javascript:;" class="item-edit-btn">
                                        <svg class="icon icon-del">
                    <use xlink:href="#icon-del"></use>
                  </svg>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cart-foot-wrap">
                <div class="cart-foot-inner">
                    <div class="cart-foot-l">
                        <div class="item-all-check">
                            <a href="javascipt:;">
                                <span class="checkbox-btn item-check-btn" v-bind:class="{'check':checkedAllFlag}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                                <span @click="toggleCheckAll" >Select all</span>
                            </a>
                        </div>
                    </div>
                    <div class="cart-foot-r">
                        <div class="item-total">
                            Item total: <span class="total-price">{{totalPrice}}</span>
                        </div>
                        <div class="btn-wrap">
                            <a class="btn btn--red">Checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    import NavHead from '@/components/NavHead'
    import BredCrumb from '@/components/BredCrumb'
    import axios from 'axios'
    export default {
        data(){
            return{
                cartList:'',
            }
        },
        computed:{
            checkedCount(){
                var i = 0;
                this.cartList.forEach(item=>{
                    if(item.checked == '1') i++;
                })
                return i;
            },
            checkedAllFlag(){
                return this.checkedCount == this.cartList.length;
            },
            totalPrice(){
                let money = 0;
                this.cartList.forEach(item=>{
                    if(item.checked == '1'){
                        money += item.salePrice * item.productNum
                    }
                })
                return  money;
            }
        },
        components:{
            NavHead,
            BredCrumb
        },
        methods:{
            getCartList(){
                axios.post('/users/cartList')
                .then(res=>{
                    this.cartList = res.data.result;
                })
            },
            editCart(flag,item){
                if(flag == 'minu'){
                    if(item.productNum <= 1){
                        return;
                    }
                    item.productNum --;
                }else if(flag == 'add'){
                    item.productNum ++;
                }else{
                    item.checked = item.checked == '1' ? 0 : 1;
                }

                axios.post('/users/cartEdit',{
                    productId:item.productId,
                    productNum:item.productNum,
                    checked:item.checked
                }).then(res=>{
                    console.log(res.data.result);
                })
            },
            toggleCheckAll(){
                let flag = !this.checkedAllFlag;

                let checkedFlag = flag ? 1 : 0;
                this.cartList.forEach(item=>{
                    item.checked = checkedFlag;
                })

                axios.post('/users/editCheckAll',{checkAll:checkedFlag})
                .then(res=>{
                    console.log(res);
                })
            }
        },
        created(){
            this.getCartList();
        }

  }
</script>