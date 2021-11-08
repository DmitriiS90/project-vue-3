import { Server, Response } from "miragejs";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = "secretKey";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    environment,

    seeds(server) {
      server.db.loadData({
        users: [],
        tokens: [],
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", (schema) => {
        return schema.db.users;
      });

      this.get("/users/me", (schema, request) => {
        request.requestHeaders["Authorization"];
      });

      this.post("/token", async (schema, request) => {
        const login = JSON.parse(request.requestBody);
        const user = schema.db.users.findBy({ login });

        if (!user) {
          return new Response(404);
        }

        if (user.id) {
          const userTokens = schema.db.tokens.findBy({ userId: +user.id });

          if (userTokens) {
            return new Response(200, undefined, {
              statusCode: 200,
              message: "Login Success",
            });
          }
        }

        const accessToken = jwt.sign({ login }, secretKey, {
          expiresIn: 900,
        });
        const refreshToken = jwt.sign({ login }, secretKey, {
          expiresIn: 86400,
        });

        schema.db.tokens.insert({
          userId: +user.id,
          accessToken,
          refreshToken,
        });

        return {
          accessToken,
          refreshToken,
        };
      });

      // this.get("/refreshToken", async (schema, request) => {

      // });

      this.post("/logout", (schema, request) => {
        const login = request.requestBody;
        const user = schema.db.users.findBy({ login });
        schema.db.tokens.remove({ userId: +user.id });

        return new Response(204);
      });

      this.post("/auth/signup", async (schema, request) => {
        const { login, password } = JSON.parse(request.requestBody);

        if (!login || !password) {
          return new Response(404);
        }

        await bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            schema.db.users.insert({ login, password: hash });
          });
        });

        return schema.db.users;
      });

      this.delete("/user/:id", (schema, request) => {
        return schema.db.users.remove(request.params.id);
      });

      this.patch("/user/:id", (schema, request) => {
        let todo = JSON.parse(request.requestBody).data;

        return schema.db.users.update(todo.id, todo);
      });
    },
  });

  return server;
}
