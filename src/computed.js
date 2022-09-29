import { computed } from "vue";
import { store } from "@/store.js";
export default {
  itemsLength() {
    return computed(() => {
      return store.campaign.items.length;
    });
  }
};
