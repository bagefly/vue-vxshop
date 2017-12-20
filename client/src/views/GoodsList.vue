<template>
  <div>
      <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price" @click="sortGoods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}">All</a></dd>
                        <dd>
                            <a href="javascript:void(0)" :class="{'cur':priceChecked == index}" v-for="(item,index) in priceFilter" :key="index" @click="setPriceFilter(index)">{{item.startPrice}} - {{item.endPrice}}</a>
                        </dd>
                        
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item,index) in GoodsList" :key="index">
                                <div class="pic">
                                    <a href="#"><img v-lazy="'/static/img/' + item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      GoodsList: '',
      sortFlag: true,
      priceChecked: 'all',
      priceFilter: [
        {
          startPrice: '0',
          endPrice: '100'
        },
        {
          startPrice: '100',
          endPrice: '500'
        },
        {
          startPrice: '500',
          endPrice: '1000'
        },
        {
          startPrice: '1000',
          endPrice: '2000'
        }
      ]
    }
  },
  methods: {
    getGoodsList () {
      let sort = this.sortFlag ? 1 : -1
      axios.get('/goods/list', {params: { 'sort': sort }})
      .then(res => {
        this.GoodsList = res.data.result
        console.log(this.GoodsList)
      })
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.getGoodsList()
    },
    setPriceFilter (index) {
      this.priceChecked = index
      this.getGoodsList()
    }
  },
  created () {
    this.getGoodsList()
  }
}
</script>