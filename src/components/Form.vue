<template>
  <div class="login">
    <form name="login-form" class="login-form">
      <div class="content">
        <slot />
      </div>
      <!-- <div class="buttons">
        <Button
          value="Sign up"
          appearance="primary"
          @click.prevent="$emit('onSubmit')"
        />
      </div> -->
    </form>
  </div>
</template>

<script>
// import Button from "./Button.vue";

export default {
  components: {
    // Button,
  },
  // emits: ["onSubmit"],
  // data() {
  //   return {
  //     login: "",
  //     password: "",
  //   };
  // },
  //   props: {
  //     login: {
  //       type: String,
  //       default: "",
  //     },
  //     password: {
  //       type: String,
  //       default: "",
  //     },
  //   },
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 10%;
  &-form {
    font-weight: 300;
    width: 300px;
    margin: 0 auto;
    background: #f3f3f3;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    .content {
      padding: 0 30px 30px 30px;
    }
    .buttons {
      display: flex;
      justify-content: space-around;
      padding: 0px 30px 20px 30px;
    }
  }
}
</style>
