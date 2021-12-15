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
          v-on:click.prevent="signIn"
        />
        <Button
          value="Sign up"
          appearance="warning"
          v-on:click.prevent="signUp"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Field from "./Field.vue";
const jwt = require("jsonwebtoken");

export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  created() {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  },
  components: {
    Field,
    Button,
  },
  methods: {
    signUp() {
      const user = JSON.stringify({
        login: this.login,
        password: this.password,
      });

      localStorage.setItem("token", jwt.sign(this.login, "secretKey"));
      this.$store.dispatch("signUp", JSON.parse(user));

      fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      });
      // this.$router.push("/signup");
    },
    async signIn() {
      const user = JSON.stringify({
        login: this.login,
        password: this.password,
      });

      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      });

      if (response.status !== 404 || response.status !== 401) {
        // const { accessToken, refreshToken } = response.data;
        this.$store.dispatch("setAuth", true);
        /*localStorage.set("accessToken", accessToken);
        localStorage.set("refreshToken", refreshToken);*/
        this.$router.push("/");
      }
    },
  },
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
      input {
        margin-top: 25px;
      }
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
