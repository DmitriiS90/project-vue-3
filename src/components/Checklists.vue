<template>
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
          <ul v-for="checkItem in checklist.checkItems" :key="checkItem.id">
            <li
              class="description-checklist__item"
              v-if="showChecklist == checklist.id"
            >
              <span class="span">{{ checkItem.name }}</span>
              <input
                type="checkbox"
                @change="deleteCheckItem(checklist.id, checkItem.id)"
              />
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
</template>

<script>
import Button from "./Button.vue";
import Field from "./Field.vue";
export default {
  components: { Button, Field },
  data() {
    return {
      showChecklists: false,
      checklists: [],
      showChecklist: null,
      checklistName: "",
      listItem: "",
      apiKey: "dc599fe2c56f5a3c881cc6c67bbd95af",
      apiToken:
        "6a8b79d7762879acb352ad2b3f0715fd4f53e1710aa6ef9cbdaee0adeb1de3e5",
    };
  },
  created() {
    this.fetchChecklists(this.cardId);
  },
  props: {
    cardId: {
      type: Number,
    },
  },
  methods: {
    toggleChecklists() {
      this.showChecklists = !this.showChecklists;
      this.showChecklist = null;
    },
    toggleChecklist(checklistId) {
      this.showChecklist = checklistId;
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
    async deleteCheckItem(listId, checkItemId) {
      await fetch(
        `https://api.trello.com/1/checklists/${listId}/checkItems/${checkItemId}?key=${this.apiKey}&token=${this.apiToken}`,
        {
          method: "DELETE",
        }
      );
      this.fetchChecklists(this.cardId);
    },
  },
};
</script>

<style lang="scss" scoped></style>
