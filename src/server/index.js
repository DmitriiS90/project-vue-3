import { Server, Response /*, Model*/ } from "miragejs";
import {
  secretKey,
  getTokenByUserId,
  // saveToken,
  checkExpiresInAccessToken,
  getTokens,
  checkExpiresInRefreshToken,
} from "./utils";
import PasswordDto from "./utils/PasswordDto";
import UserDao from "./utils/UserDao";
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const exactToken = (authHeader) => {
  const [key, token] = authHeader.split(" ");

  if (key === "Bearer") {
    return token;
  }

  return null;
};

// class AppServer {
//   static server = new Server({
//     environment: "development",
//     models: {
//       users: Model,
//       accessToken: Model,
//       refreshToken: Model,
//     },
//   });
// }

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    environment,
    seeds(server) {
      server.db.loadData({
        users: [],
        accessToken: [],
        refreshToken: [],
        projects: [],
        boards: [],
      });
    },

    async routes() {
      this.namespace = "api";

      this.get("/test", (schema) => {
        return schema.db.users.find(1);
      });

      this.get("/users", (schema) => {
        return schema.db.users;
      });

      this.get("/users/me", async (schema, request) => {
        const authHeader = request.requestHeaders["Authorization"];

        const accessToken = exactToken(authHeader);

        if (!accessToken) {
          return new Response(403);
        }

        const { login } = await jwt.decode(accessToken, { complete: true });

        const currentUser = schema.db.users.findBy({ login });

        return currentUser;
      });

      this.get("/projects", (schema) => {
        return schema.db.projects;
      });

      this.get("/projects/:id", (schema, request) => {
        const id = +request.params.id;
        const project = schema.db.projects.find(id);

        return project;
      });

      this.get("/projects/:id/boards", (schema, request) => {
        const id = +request.params.id;
        const project = schema.db.projects.find(id);

        return project.boards;
      });

      this.post("/projects", async (schema, request) => {
        const { name } = JSON.parse(request.requestBody);

        schema.db.projects.insert({ name, boards: [] });
      });

      this.get("/boards", (schema) => {
        return schema.db.boards;
      });

      this.post("/projects/:id/boards", async (schema, request) => {
        const id = +request.params.id;

        const { name } = JSON.parse(request.requestBody);
        const project = schema.db.projects.find(id);
        project.boards.push({ id: project.boards.length, name, list: [] });

        schema.db.projects.update({ id: +id }, project);
        // schema.db.boards.insert({ name });
      });

      this.post("/projects/:id/board", async (schema, request) => {
        const id = +request.params.id;

        const { boardId, listItem } = JSON.parse(request.requestBody);
        const project = schema.db.projects.find(id);
        project.boards[boardId].list.push({
          id: project.boards[boardId].list.length,
          listItem,
        });

        schema.db.projects.update({ id: +id }, project);
      });

      this.post("/token", async (schema, request) => {
        const { login, password } = JSON.parse(request.requestBody);
        const user = UserDao.getUserByLogin(schema, login);

        const isExistPassword = await PasswordDto.compare(
          password,
          user.password
        );

        if (isExistPassword) {
          const accessTokenByUser = getTokenByUserId(
            schema.db.accessToken,
            user.id
          );

          if (!accessTokenByUser) {
            const tokens = getTokens({
              accessTokenData: {
                expiresIn: "1h",
                secretKey,
                payload: { login },
              },
              refreshTokenData: {
                expiresIn: "30d",
                secretKey,
                payload: { login },
              },
            });

            return new Response(200, undefined, tokens);
          }

          if (!checkExpiresInAccessToken(schema, user)) {
            const tokens = checkExpiresInRefreshToken(schema, user);

            return new Response(200, undefined, tokens);
          }

          return new Response(200);
        }

        return new Response(404, undefined, {
          statusCode: 404,
          errorMessage: "User not found",
        });
      });

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

        const hashedPassword = await PasswordDto.hash(undefined, password);

        schema.db.users.insert({ login, password: hashedPassword });

        return schema.db.users;
      });
    },
  });

  return server;
}
