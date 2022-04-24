<template>
  <div>
    <base-header type="gradient-primary" class="px-5 pb-6 pb-8 pt-5 pt-md-8 overflow-hidden">
      <div class="js-carousel-review">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in categories" :key="item.id">
            <div class="card">
              <div class="card-body py-3">
                <div class="row">
                  <div class="col">
                    <slot>
                      <h5 class="card-title text-uppercase text-muted mb-0">{{ item.name }}</h5>
                      <span class="text-white">
                        <span v-if="!item.locked" class="badge bg-success"><i class="fa fa-unlock-alt" aria-hidden="true"></i> Open</span>
                        <span v-else class="badge bg-warning"><i class="fa fa-lock" aria-hidden="true"></i> Lock</span></span
                      >
                    </slot>
                  </div>

                  <div class="col-auto" v-if="!item.locked">
                    <slot name="icon">
                      <div
                        role="button"
                        class="icon icon-shape text-white rounded-circle shadow bg-gradient-success"
                        @click="isOpenModalNewIdea = true"
                      >
                        <i class="fa fa-plus"></i>
                      </div>
                    </slot>
                  </div>
                  <p class="mt-3 mb-0 pl-3 text-sm">
                    <span class="text-nowrap"><span class="text-warning mr-2">Close at: </span>{{ convertTime(item.close_date) }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-lg-4 mb-4" v-for="item in ideas" :key="item.id">
          <div class="card">
            <div class="card-img-top">
              <div
                class="page-header border-radius-xl card-img-top"
                :style="{
                  minHeight: '200px',
                  backgroundImage: `url(${
                    item?.image?.source_url
                      ? item?.image?.source_url
                      : 'https://idea-dash.s3.ap-southeast-1.amazonaws.com/files/49c58c26-0915-442b-9359-7f99759bd3ce.jpeg'
                  })`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: ' center center',
                }"
              ></div>
            </div>

            <div class="card-body">
              <h3 class="card-title mb-1">{{ item?.name }}</h3>
              <p
                class="card-text text-sm"
                :style="{
                  maxHeight: '100px',
                  overflow: 'hidden',
                }"
              >
                {{ removeTags(item?.description) }}
              </p>
              <a class="btn btn-outline-success btn-sm" @click="readMore(item)">Read More</a>
              <a href="javascript:void();" class="btn btn-outline-danger btn-sm"><i class="far fa-heart"></i></a>
            </div>
          </div>
        </div>
      </div>
      <span class="text-center d-block justify-content-center" v-if="nextPage"
        ><p role="button" @click="loadMore(nextPage)"><i class="ni ni-bold-down ml-3 text-xl" aria-hidden="true"></i></p
      ></span>
    </div>
  </div>
  <idea-modal :idea="currentIdea" :show="isOpenModal" @close="isOpenModal = false"></idea-modal>
  <NewIdeaModal :show="isOpenModalNewIdea" @close="isOpenModalNewIdea = false"></NewIdeaModal>
</template>
<script>
import { defineComponent } from 'vue'
import moment from 'moment-timezone'
import { Swiper, Pagination, Navigation, Autoplay } from 'swiper'
import CategoryService from '@/services/CategoryService.js'
import IdeaModal from '@/components/IdeaModal.vue'
import NewIdeaModal from '@/components/NewIdeaModal.vue'
import IdeaService from '@/services/IdeaService.js'
import '@SwiperBundle'
Swiper.use([Pagination, Autoplay, Navigation])
moment().tz('Asia/Ho_Chi_Minh').format()
export default defineComponent({
  name: 'Home',
  components: { IdeaModal, NewIdeaModal },
  data() {
    return {
      isOpenModal: false,
      isOpenModalNewIdea: false,
      swiper: null,
      page: 1,
      nextPage: null,
      lastPage: 0,
      categories: [],
      ideas: [],
      currentIdea: {},
    }
  },
  async mounted() {
    this.$store.dispatch('setPage', this.page)
    this.$store.dispatch('setLimit', 6)
    await this.init()
  },
  methods: {
    async init() {
      this.$store.dispatch('startLoading')
      try {
        const res = await CategoryService.getAll(this.$axios)
        await this.searchRandom()
        if (res.success) {
          const data = res.data
          this.categories = data.map((item) => {
            item.locked = moment() > moment(item.lock_date)
            return item
          })
          this.initSwiper()
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    async loadMore(number) {
      if (!number || number <= 0 || number > this.lastPage) return
      this.$store.dispatch('setPage', number)
      await this.search()
    },
    async searchByCategory(categoryId) {
      this.$store.dispatch('setPage', 1)
      await this.search({ categoryId }, true)
    },
    async searchRandom() {
      this.$store.dispatch('startLoading')
      try {
        const res = await IdeaService.search(this.$axios, this.$store, { rand: true })
        if (res.success) {
          const { data, page, nextPage, lastPage } = res.data
          this.ideas = data
          this.page = page
          this.nextPage = nextPage
          this.lastPage = lastPage
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    async search(param = {}, forceUpdate = false) {
      this.$store.dispatch('startLoading')
      try {
        const res = await IdeaService.search(this.$axios, this.$store, param)
        if (res.success) {
          const { data, page, nextPage, lastPage } = res.data
          this.ideas = forceUpdate ? data : this.ideas.concat(data)
          this.page = page
          this.nextPage = nextPage
          this.lastPage = lastPage
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    readMore(idea) {
      this.currentIdea = idea
      this.isOpenModal = true
    },
    initSwiper() {
      this.swiper = new Swiper('.js-carousel-review', {
        autoplay: true,
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        slidesPerGroup: 3,
        spaceBetween: 30,
        grabCursor: true,
        watchOverflow: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          480: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          960: {
            slidesPerView: 3,
          },
          1500: {
            slidesPerView: 4,
          },
        },
        autoplay: {
          delay: 3000,
        },
      })
    },
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm')
    },
    removeTags(string) {
      return !string
        ? ''
        : string
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .trim()
    },
  },
})
</script>
<style lang="scss">
.document-block {
  background-color: #f8f8f8;
  justify-content: center;
  align-items: center;
}
.swiper-pagination-bullet {
  background: #fff;
}
.swiper-pagination-bullet-active {
  background: #fff;
}
.swiper-pagination {
  position: unset;
  margin-top: 1rem;
}
</style>
