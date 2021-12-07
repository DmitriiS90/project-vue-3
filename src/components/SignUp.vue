<template>
  <Form>
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
    <Button
      v-if="!this.$store.getters.getUser"
      value="Sign up"
      appearance="warning"
      @click.prevent="signUp"
    />
    <Button v-else value="Log in" appearance="danger" @click.prevent="signIn" />
    <Button value="Test" appearance="danger" @click.prevent="test" />
  </Form>
</template>

<script>
import Field from "./Field.vue";
import Form from "./Form.vue";
import Button from "./Button.vue";
const jwt = require("jsonwebtoken");

export default {
  components: {
    Form,
    Field,
    Button,
  },
  created() {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  },
  data() {
    return {
      login: "",
      password: "",
    };
  },

  methods: {
    async test() {
      await fetch("/api/test", {
        method: "GET",
      });
    },
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
      this.$router.push("/login");
    },
    signIn() {
      const user = JSON.stringify({
        login: this.login,
        password: this.password,
      });

      fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: user,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
      this.$store.dispatch("setAuth", true);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
