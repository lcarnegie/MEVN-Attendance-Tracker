<template>
  <div class="page">
    <div class="buttons">
      <b-button v-b-modal.add-modal>Add Calendar Event</b-button>
    </div>
    <full-calendar :events="events" @event-selected="openEditModal" defaultView="month" />
<b-modal id="add-modal" title="Add Calendar Event" hide-footer ref="add-modal">
      <CalendarForm :edit="false" @eventSaved="closeModal()" />
    </b-modal>
<b-modal id="edit-modal" title="Edit Calendar Event" hide-footer ref="edit-modal">
      <CalendarForm :edit="true" :calendarEvent="calendarEvent" @eventSaved="closeModal()" />
    </b-modal>
  </div>
</template>
<script>
// @ is an alias to /src
import CalendarForm from "@/components/CalendarForm.vue";
import { requestsMixin } from "../mixins/requestsMixin";
export default {
  name: "home",
  components: { 
    CalendarForm
  },
  mixins: [requestsMixin],
  computed: {
    events() {
      return this.$store.state.events;
    }
  },
  data() {
    return {
      calendarEvent: {}
    };
  },
  async beforeMount() {
    await this.getEvents();
  },
  methods: {
    async getEvents() {
      const response = await this.getCalendar();
      this.$store.commit("setEvents", response.data);
    },
    closeModal() {
      this.$refs["add-modal"].hide();
      this.$refs["edit-modal"].hide();
      this.calendarEvent = {};
    },
    openEditModal(event) {
      let { id, start, end, title } = event;
      this.calendarEvent = { id, start, end, title };
      this.$refs["edit-modal"].show();
    }
  }
};
</script>
<style lang="scss" scoped>
.buttons {
  margin-bottom: 10px;
}
</style>