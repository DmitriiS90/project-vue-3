<template>
  <div class="login">
    <form name="login-form" class="login-form">
      <div class="content">
        <Field
          name="login"
          type="text"
          placeholder="Логин"
          className="input"
          v-model.value="login"
        />
        <Field
          name="password"
          type="password"
          placeholder="Пароль"
          className="input"
          v-model.value="password"
        />
      </div>
      <div class="buttons">
        <Button
          value="Log in"
          appearance="primary"
          @click.prevent="$emit('auth', { login })"
        />
        <Button
          value="Sign up"
          appearance="warning"
          @click.prevent="$emit('singUp', { login, password })"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Field from "./Field.vue";

export default {
  components: {
    Field,
    Button,
  },
  emits: ["singUp", "auth"],
  data() {
    return {
      login: "",
      password: "",
    };
  },
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
      background: #f3f3f3;
    }
  }
}
</style>
