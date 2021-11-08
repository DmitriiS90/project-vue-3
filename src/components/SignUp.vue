<template>
  <Form @auth="auth" @singUp="signUp" />
</template>

<script>
import Form from "./Form.vue";

export default {
  created() {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  },
  components: {
    Form,
  },
  methods: {
    signUp({ login, password }) {
      const user = JSON.stringify({
        login,
        password,
      });

      this.$store.dispatch("signUpUser", JSON.parse(user));

      fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      });
    },
    auth({ login }) {
      fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(login),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
