import { Server } from "miragejs";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = "secretKey";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    environment,

    seeds(server) {
      server.db.loadData({
        users: [],
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", (schema) => {
        return schema.db.users;
      });

      this.get("/auth/login", async (schema, request) => {
        const data = request.requestBody;
        const token = jwt.sign({ login: data.login }, secretKey);

        await this.get("/auth/token", () => {
          return { token };
        });

        return schema.db.users.findBy({ login: data.login });
      });

      this.get("/users/me", (schema, request) => {
        request.requestHeaders["Authorization"];
      });

      this.post("/auth/signup", async (schema, request) => {
        const { login, password } = request.requestBody;

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
