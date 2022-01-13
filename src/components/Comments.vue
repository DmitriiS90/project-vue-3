<template>
  <div class="description-comments">
    <p @click="toggleComments" class="description-comments__title">Comments</p>
    <div v-if="showComments">
      <div class="description-comments__content" v-if="comments.length">
        <ul v-for="comment in comments" :key="comment.id">
          <li>
            {{ comment.data.text }}
            <Button
              value="x"
              appearance="warning"
              @click="deleteComment(comment.id)"
            />
          </li>
        </ul>
      </div>
      <p v-else>no comments</p>
      <Field className="input" v-model="comment" />
      <Button value="+" appearance="primary" @click="addComment" />
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Field from "./Field.vue";
export default {
  components: { Button, Field },
  data() {
    return {
      showComments: false,
      comments: [],
      comment: "",
      apiKey: "dc599fe2c56f5a3c881cc6c67bbd95af",
      apiToken:
        "6a8b79d7762879acb352ad2b3f0715fd4f53e1710aa6ef9cbdaee0adeb1de3e5",
    };
  },
  created() {
    this.fetchComments(this.cardId);
  },
  props: {
    cardId: {
      type: Number,
    },
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    async fetchComments(cardId) {
      const response = await fetch(
        `https://api.trello.com/1/cards/${cardId}/actions?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const comments = await response.json();
      this.comments = comments;
      console.log(this.comments);
    },
    async addComment() {
      await fetch(
        `https://api.trello.com/1/cards/${this.cardId}/actions/comments?key=${this.apiKey}&token=${this.apiToken}&text=${this.comment}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      );
      this.fetchComments(this.cardId);
    },
    async deleteComment(commentId) {
      await fetch(
        `https://api.trello.com/1/cards/${this.cardId}/actions/${commentId}/comments?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "DELETE",
        }
      );
      this.fetchComments(this.cardId);
    },
  },
};
</script>

<style lang="scss" scoped></style>
