<template>
  <modal :show="show" @close="onClose" type="mini" footerClasses="p-1" modalClasses="modal-full modal-dialog-scrollable" bodyClasses="px-lg-9 pt-0">
    <template v-slot:header></template>
    <div class="card card-block card-stretch card-height mb-3 px-lg-5 border-0">
      <div class="card-body">
        <div class="user-post-data">
          <div class="d-flex justify-content-between">
            <div class="me-3">
              <img
                :src="
                  idea.author?.image?.source_url && !idea.is_incognito
                    ? idea.author?.image?.source_url
                    : 'https://idea-dash.s3.ap-southeast-1.amazonaws.com/files/4eaf9a0c-f899-471d-97b0-c773f97f5cbd.png'
                "
                alt="userimg"
                class="avatar-25 rounded-circle avatar avatar-md"
              />
            </div>
            <div class="w-100 ml-3 mb-3">
              <div class="d-flex justify-content-between">
                <div class="">
                  <h2 class="mb-0 d-inline-block">{{ idea.is_incognito ? 'Anonymous' : idea.author?.user_name }}</h2>
                  <p class="mb-0 text-dark text-sm">{{ convertTime(idea.created_at) }}</p>
                </div>
                <span>
                  <a href="javascript:void();" class="btn btn-outline-success btn-md"
                    ><i class="fa fa-tag" aria-hidden="true"></i>
                    <span class="d-inline-block"
                      ><span class="mb-0 ml-1 d-none d-md-block">{{ idea.topic?.name }}</span></span
                    ></a
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="user-post" v-if="idea.image">
          <div class="d-grid grid-rows-2 grid-flow-col gap-3">
            <div class="row-span-2 row-span-md-1">
              <img :src="idea.image?.source_url" alt="post-image" class="img-fluid rounded w-100" />
            </div>
          </div>
        </div>
        <div class="mt-3">
          <h5 class="mb-0 d-inline-block">{{ idea.title }}</h5>
          <span class="mt-2 d-block" v-html="idea.description"></span>
        </div>
        <span class="document-block text-start d-block p-3 align-middle d-flex justify-content-between rounded text-secondary" v-if="idea.document"
          ><a href="javascript:void();" role="button" class="text-success"
            ><i class="fa fa-files-o" aria-hidden="true"></i> {{ idea.document?.name }}</a
          >
          <a :href="idea.document?.source_url" class="btn btn-outline-light btn-md">
            <span class="mb-0 ml-1 d-inline-block"
              ><i class="fa fa-cloud-download" aria-hidden="true"></i>
              <span class="d-inline-block"><span class="d-none d-md-block">Download</span></span></span
            ></a
          ></span
        >
        <div class="comment-area mt-3">
          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <div class="like-block position-relative d-flex align-items-center">
              <div class="d-flex align-items-center">
                <div class="total-like-block ms-2 mx-3">
                  <span role="button"> {{ idea.upVoteCount }} <i class="fa fa-thumbs-up" aria-hidden="true" @click="upVote(idea.id)"></i> </span>
                </div>
              </div>
              <div class="mx-3 total-comment-block">
                <span role="button"> {{ idea.downVoteCount }} <i class="fa fa-thumbs-down" aria-hidden="true" @click="downVote(idea.id)"></i> </span>
              </div>
            </div>
            <div class="share-block d-flex align-items-center feather-icon mt-2 mt-md-0">
              <a href="javascript:void();" data-bs-toggle="offcanvas" data-bs-target="#share-btn" aria-controls="share-btn">
                <span class="mx-3"> {{ idea.commentCount }} <i class="fa fa-comments" aria-hidden="true"></i></span
              ></a>
            </div>
          </div>
          <hr />
          <ul class="post-comments list-inline p-0 m-0" v-if="idea.commentCount > 0">
            <li class="mb-4" v-for="comment in idea.comments" :key="comment.id">
              <div class="d-flex">
                <div class="user-img">
                  <img
                    :src="
                      comment.creator?.image?.source_url
                        ? comment.creator?.image?.source_url
                        : 'https://ideas-manager.s3.ap-southeast-1.amazonaws.com/files/b4e5f150-3863-49b1-a299-05a900066470.png'
                    "
                    alt="userimg"
                    class="avatar-25 rounded-circle avatar avatar-sm"
                  />
                </div>
                <div class="comment-data-block mx-3">
                  <h3 class="mb-1">{{ comment.creator.user_name }}</h3>
                  <p class="mb-0">{{ comment.comment }}</p>
                  <div class="d-flex flex-wrap align-items-center comment-activity text-sm">
                    <span> {{ convertTime(comment.created_at) }} </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <span class="text-center d-block" v-else
            ><p><i class="fa fa-comments-o" aria-hidden="true"></i> Comment to this post</p></span
          >
          <validate-form class="comment-text d-flex align-items-center mt-3" @submit="(data) => postComment(data, idea.id)">
            <base-input
              formGroupClasses="w-100 rounded-5 mb-0 "
              type="text"
              name="comment"
              formClasses="border border-1 input-group-alternative rounded"
              placeholder="Enter Your Comment"
            />
            <div class="comment-attagement d-flex d-block mx-3">
              <button type="submit" class="border-0 bg-transparent text-black-50"><i class="ni ni-curved-next" aria-hidden="true"></i></button>
            </div>
          </validate-form>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import moment from 'moment-timezone'
moment().tz('Asia/Ho_Chi_Minh').format()
import IdeaService from '@/services/IdeaService.js'
import CommentService from '@/services/CommentService.js'
export default {
  name: 'idea-modal',
  props: {
    idea: {
      type: Object,
      default: {},
    },
    show: Boolean,
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
      this.$emit('close')
    },
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm')
    },
  },
}
</script>
<style lang="scss">
.modal-full {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  margin-top: 3.5rem !important;
}
@media (max-width: 576px) {
  .modal-full {
    margin-top: 1rem !important;
  }
}
</style>
