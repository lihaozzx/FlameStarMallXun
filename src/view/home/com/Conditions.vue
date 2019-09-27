<template>
  <div>
    <div v-if="active !== 0" class="conditions">
      <div class="conditions-item" :class="{active: sortBy2 === 1}" @click="toggleItem(1)">综合</div>
      <div class="conditions-item" :class="{active: sortBy2 === 2}" @click="toggleItem(2)">
        <div>价格</div>
        <div class="conditions-item-sort">
          <div
            @click="toggleItemSort(1)"
            class="conditions-item-sort-icon"
            :class="{active2: sortFlag2 === 1}"
          ></div>
          <div
            @click="toggleItemSort(2)"
            class="conditions-item-sort-icon2"
            :class="{active2: sortFlag2 === 2}"
          ></div>
        </div>
      </div>
      <div class="conditions-item" :class="{active: sortBy2 === 3}" @click="toggleItem(3)">
        <div>上新</div>
        <div class="conditions-item-sort">
          <div
            @click="toggleItemSort(1)"
            class="conditions-item-sort-icon"
            :class="{active2: sortFlag2 === 1}"
          ></div>
          <div
            @click="toggleItemSort(2)"
            class="conditions-item-sort-icon2"
            :class="{active2: sortFlag2 === 2}"
          ></div>
        </div>
      </div>
    </div>
    <div v-if="active !== 0">
      <van-list
        class="quality-container"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          @click="checkGoodsDeil(item)"
          class="quality-item"
          v-for="item in categoriesGoodsList"
          :key="item.id"
        >
          <img class="img" v-if="item.imageUrls[0]" :src="item.imageUrls[0]" alt />
          <img class="img" v-else src="../../../assets/zhanw_tb_n.png" alt />
          <div class="content">
            <div class="name">
              <div v-if="item.tags && item.tags[0] === 1" class="icon">自营</div>
              {{item.name}}
            </div>
            <div class="price-container">
              <div class="price1">
                <span style="font-size:0.24rem">￥</span>
                <span
                  style="font-size:0.36rem"
                >{{parseFloat((item.dctPrice - item.marketingCashBack.totalAmount).toFixed(2))}}</span>
              </div>
              <div class="price2">￥{{item.orgPrice}}</div>
            </div>
            <div class="share">
              <div class="left">
                <span style="color: #FF8D12">实付</span>
                <span style="color: #FF2644">￥{{item.dctPrice}}</span>
                <span style="color: #FF8D12">返</span>
                <span
                  style="color: #FF2644"
                >￥{{parseFloat((item.marketingCashBack.totalAmount).toFixed(2))}}</span>
              </div>
              <!--<img class="share-img" src="../../../assets/home/pinzhi_list_share_icon@2x.png">-->
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import homeApi from "@/api/home";
export default {
  name: "conditions",
  props: {
    sortBy: {
      type: Number,
      default: 1
    },
    active: {
      type: Number,
      default: 1
    },
    sortFlag: {
      type: Number,
      default: 1
    },
    categoryId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      finished: false,
      loading: false,
      pageNumber: 1,
      pageSize: 5,
      sortBy2: this.sortBy,
      sortFlag2: this.sortFlag,
      categoriesGoodsList: [] // 分类下的商品
    };
  },
  created() {
    this.getCategoriesGoods();
  },
  methods: {
    onLoad() {
      let self = this;
      setTimeout(() => {
        self.getCategoriesGoods("pullUp");
      }, 100);
    },
    toggleItem(val) {
      this.sortBy2 = val;
      this.finished = false;
      this.loading = false;
      this.pageNumber = 1;
      this.pageSize = 5;
      this.getCategoriesGoods();
    },
    toggleItemSort(val) {
      this.sortFlag2 = val;
      this.finished = false;
      this.loading = false;
      this.pageNumber = 1;
      this.pageSize = 5;
      this.getCategoriesGoods();
    },
    getCategoriesGoods(type) {
      if (type === "pullUp") {
        this.pageNumber++;
        const data = {
          categoryId: this.categoryId,
          sortBy: this.sortBy2,
          sortFlag: this.sortFlag2,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        };
        homeApi.getCategoriesGoods(data).then(res => {
          let arr = res.data.content.items;
          this.categoriesGoodsList = this.categoriesGoodsList.concat(arr);
          if (arr.length < this.pageSize) {
            this.finished = true; // 不在触发接口
          }
          this.loading = false;
        });
      } else {
        const data = {
          categoryId: this.categoryId,
          sortBy: this.sortBy2,
          sortFlag: this.sortFlag2,
          pageNumber: 1,
          pageSize: this.pageSize
        };
        homeApi.getCategoriesGoods(data).then(res => {
          this.categoriesGoodsList = res.data.content.items;
          this.loading = false;
        });
      }
    },
    checkGoodsDeil(item) {
      this.$router.push({ name: "GoodsDetail", params: { id: item.id } });
    }
  },
  watch: {
    watch: {
      sortFlag2(val) {
        this.getCategoriesGoods();
      },
      sortBy2(val) {
        console.log(val);
        this.getCategoriesGoods();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.conditions {
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: space-between;
  width: 7.5rem;
  height: 1.08rem;
  background: rgba(255, 255, 255, 1);
  .active {
    color: #ff8d12;
  }
  .conditions-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.36rem;
    height: 1.08rem;
    background: rgba(255, 255, 255, 1);
    font-size: 0.3rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    .conditions-item-sort {
      margin-left: 0.1rem;
      .active2 {
        border-color: #fff #fff #ff8d12 #fff;
      }
      .conditions-item-sort-icon {
        border-width: 0 6px 6px 6px;
        border-color: #fff #fff #999999 #fff;
        border-style: solid;
        height: 0;
        width: 0;
        margin-bottom: 0.1rem;
      }
      .conditions-item-sort-icon2 {
        border-width: 6px 6px 0 6px;
        border-color: #999999 #fff #fff #fff;
        border-style: solid;
        height: 0;
        width: 0;
      }
    }
  }
}
.quality-container {
  padding: 0 0.2rem 1rem 0.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .quality-item {
    margin-bottom: 0.2rem;
    width: 3.48rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.08rem;
    .img {
      display: block;
      width: 3.48rem;
      height: 3.48rem;
      border-radius: 8px 8px 0 0;
    }
    .content {
      width: 3.48rem;
      border-radius: 0 0 8px 8px;
      .name {
        padding-top: 0.17rem;
        padding-left: 0.17rem;
        font-size: 0.28rem;
        height: 0.78rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* ! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        .icon {
          display: inline-block;
          text-align: center;
          width: 0.7rem;
          height: 0.28rem;
          line-height: 0.28rem;
          background: rgba(255, 81, 122, 1);
          border-radius: 0.14rem;
          font-size: 0.2rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          margin-top: 0.06rem;
          margin-right: 0.13rem;
        }
      }
      .price-container {
        padding-top: 0.23rem;
        display: flex;
        justify-content: flex-start;
        .price1 {
          padding-left: 0.17rem;
          padding-right: 0.16rem;
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(227, 58, 89, 1);
        }
        .price2 {
          line-height: 0.6rem;
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          text-decoration: line-through;
          color: rgba(153, 153, 153, 1);
        }
      }
      .share {
        padding-left: 0.17rem;
        /*padding-right: 0.17rem;*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .left {
          padding-left: 0.1rem;
          padding-right: 0.1rem;
          background: #fcf3ed;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
        .share-img {
          width: 0.44rem;
          height: 0.44rem;
        }
      }
    }
  }
}
</style>
