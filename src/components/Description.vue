<template>
  <div class="description">
    <div class="description-container">
      <h3 class="description-title">{{ this.cardName }}</h3>
      <div class="description-content">
        <div class="description-text">
          <p v-on:click="toggleDescription" class="description-subtitle">
            Description <span>Edit <img src="/images/edit.png" /></span>
          </p>
          <p v-if="descriptionText">{{ this.descriptionText }}</p>
          <p v-else>no description</p>
          <textarea v-if="showDescription" v-model="descriptionText"></textarea>
        </div>
        <div v-if="showDescription" class="description-controls">
          <Button
            value="Edit"
            appearance="primary"
            @click="addDescription(this.cardId)"
          />
        </div>

        <div class="description-checklist">
          <p v-on:click="toggleChecklists" class="description-checklist__title">
            CheckLists
          </p>
          <div v-if="showChecklists">
            <div v-if="this.checklists.length">
              <div
                v-for="checklist in this.checklists"
                :key="checklist.id"
                class="description-checklist__content"
              >
                <p
                  v-on:click="toggleChecklist(checklist.id)"
                  class="description-checklist__name"
                >
                  {{ checklist.name }}
                </p>
                <ul
                  v-for="checkItem in checklist.checkItems"
                  :key="checkItem.id"
                >
                  <li
                    class="description-checklist__item"
                    v-if="showChecklist == checklist.id"
                  >
                    <span class="span">{{ checkItem.name }}</span>
                    <input type="checkbox" />
                  </li>
                </ul>
                <Field
                  v-if="showChecklist == checklist.id"
                  className="input"
                  v-model="listItem"
                />
                <Button
                  v-if="showChecklist == checklist.id"
                  value="+"
                  appearance="primary"
                  @click="addListItem(checklist.id)"
                />
                <Button
                  v-if="showChecklist == checklist.id"
                  value="Delete checklist"
                  appearance="danger"
                  @click="deleteChecklist(checklist.id)"
                />
              </div>
            </div>
            <p v-else class="description-checklist__name">NO CHECKLIST</p>
          </div>
          <div v-if="showChecklists" class="description-checklist__form">
            <Field className="input" v-model="checklistName" />
            <Button
              value="Create checklist"
              appearance="primary"
              @click="createChecklist(this.cardId)"
            />
          </div>
        </div>

        <div class="description-actions">
          <p>Actions</p>
        </div>
      </div>
      <Button
        value="Cancel"
        appearance="danger"
        @click.prevent="$emit('closeDescription')"
      />
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
      showModal: false,
      showDescription: false,
      showChecklists: false,
      showChecklist: null,
      descriptionText: "",
      checklists: [],
      checklistName: "",
      listItem: "",
      apiKey: "dc599fe2c56f5a3c881cc6c67bbd95af",
      apiToken:
        "6a8b79d7762879acb352ad2b3f0715fd4f53e1710aa6ef9cbdaee0adeb1de3e5",
    };
  },
  created() {
    this.fetchDescriptionText(this.cardId);
  },
  props: {
    cardName: {
      type: String,
      default: "",
    },
    boardId: {
      type: Number,
    },
    cardId: {
      type: Number,
    },
  },
  methods: {
    async fetchDescriptionText(cardId) {
      const response = await fetch(
        `https://api.trello.com/1/cards/${cardId}?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const card = await response.json();
      this.descriptionText = card.desc;
      this.fetchChecklists(cardId);
    },
    async fetchChecklists(cardId) {
      const response = await fetch(
        `https://api.trello.com/1/cards/${cardId}/checklists?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const checklists = await response.json();
      this.checklists = checklists;
      // debugger;
      console.log(this.checklists);
    },
    async addDescription(cardId) {
      await fetch(
        `https://api.trello.com/1/cards/${cardId}?key=${this.apiKey}&token=${this.apiToken}&desc=${this.descriptionText}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
          },
        }
      ).then((response) => {
        this.fetchDescriptionText(cardId);
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      });
    },
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
    toggleChecklists() {
      this.showChecklists = !this.showChecklists;
      this.showChecklist = null;
    },
    toggleChecklist(checklistId) {
      this.showChecklist = checklistId;
    },
    async createChecklist() {
      await fetch(
        `https://api.trello.com/1/cards/${this.cardId}/checklists?key=${this.apiKey}&token=${this.apiToken}&name=${this.checklistName}`,
        {
          method: "POST",
        }
      );
      this.fetchChecklists(this.cardId);
    },
    async addListItem(listId) {
      await fetch(
        `https://api.trello.com/1/checklists/${listId}/checkItems?key=${this.apiKey}&token=${this.apiToken}&name=${this.listItem}`,
        {
          method: "POST",
        }
      );
      this.fetchChecklists(this.cardId);
    },
    async deleteChecklist(listId) {
      await fetch(
        `https://api.trello.com/1/checklists/${listId}?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "DELETE",
        }
      );
      this.fetchChecklists(this.cardId);
    },
  },
};
</script>

<style lang="scss" scoped>
.description {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(131, 129, 129, 0.5);
  display: table;
  &-title {
    margin: 0 auto;
    width: 70%;
    padding: 10px;
    border-bottom: rgba(95, 92, 92, 0.5) 2px solid;
  }
  &-container {
    width: 30%;
    margin: 10% auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    font-family: Helvetica, Arial, sans-serif;
  }
  &-content {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
  }
  &-text {
    p:nth-child(2) {
      font-size: 15px;
      padding-left: 20px;
    }
    textarea {
      width: 100%;
      height: 100px;
      display: block;
    }
  }
  &-subtitle {
    width: fit-content;
    &:hover {
      color: rgb(173, 27, 27);
    }
    &:hover span {
      display: inline;
    }
    span {
      display: none;
      color: black;
    }
    img {
      width: 15px;
    }
  }
  &-controls {
    padding-top: 20px;
    width: 25%;
    margin: 0 auto;
    text-align: center;
  }
  &-checklist {
    &__title:hover {
      color: rgb(173, 27, 27);
    }
    &__content {
      border: #555151 2px solid;
      border-radius: 10px;
    }
    &__name {
      padding-left: 20px;
      text-decoration: underline;
    }
    &__item {
      width: 100%;
      font-size: 15px;
    }
  }
}
</style>
