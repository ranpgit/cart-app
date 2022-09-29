<template>
  <div class="margin-bottom margin-large">
    <n-card
      class="card"
      :title="item.service ? item.service.name : ''"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <template #header-extra>
        <n-space size="large">
          <!-- Tag: Done -->
          <n-tag v-if="status" round :bordered="false" type="success">
            Done
            <template #icon>
              <n-icon>
                <ph-check-circle weight="fill" />
              </n-icon>
            </template>
          </n-tag>
          <n-tag v-else round :bordered="false" type="warning"> Incomplete </n-tag>
          <n-dropdown trigger="click" :options="options" @select="handleSelect">
            <n-button
              ><n-icon size="24">
                <ph-dots-three-vertical weight="bold" /> </n-icon
            ></n-button>
          </n-dropdown>
        </n-space>
      </template>
      <template #action>
        <n-collapse>
          <n-collapse-item title="Budget Breakdown">
            <div>This allows you to see exactly how we use your budget:</div>
            <n-space>
              <n-space vertical>
                <div class="budget-breakdown-cost">
                  {{ cost ? cost : "hey" }}
                </div>
                <div class="budget-breakdown-title"></div>
              </n-space>
            </n-space>
          </n-collapse-item>
        </n-collapse>
      </template>
      <ServiceForm :item="item" @new-cost="handleCostChange(newCost)" @form-status="updateStatus"/>
    </n-card>
  </div>
</template>

<script>
import { h } from "vue";
import {
  PhTrash as DeleteIcon,
  PhCopy as CopyIcon,
  PhDotsThreeVertical,
  PhCheckCircle,
} from "phosphor-vue";
import {
  NIcon,
  NCard,
  NDropdown,
  NButton,
  NTag,
  NSpace,
  NCollapse,
  NCollapseItem,
} from "naive-ui";
import { useAppStore } from "../store/app";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

export default {
  setup() {
    const store = useAppStore();

    return {
      store,
      options: [
        {
          label: "Delete",
          key: "delete",
          icon: renderIcon(DeleteIcon),
        },
        {
          label: "Clone",
          key: "clone",
          icon: renderIcon(CopyIcon),
        },
      ],
    };
  },
  data() {
    return {
      cost: null,
      status: false,
    };
  },
  methods: {
    updateStatus(status) {
      this.status = status
    },
    handleCostChange(newCost) {
      this.cost = newCost;
    },
    handleSelect (key) {
      console.log(key)
      switch (key) {
        case 'delete':
        this.store.deleteCampaignItem(this.item.itemId);
          return;
        case 'clone':
          this.store.cloneCampaignItem(this.item.itemId);
          return;
      }
    },
  },
  props: ["item", "title"],
  components: {
    NIcon,
    NCard,
    NDropdown,
    NButton,
    PhDotsThreeVertical,
    PhCheckCircle,
    NTag,
    NSpace,
    NCollapse,
    NCollapseItem,
  },
};
</script>

<style scoped>
.card {
  background-color: #28273f;
  border-radius: 1rem;
  border: none;
}
.background-none {
  background: transparent;
}
</style>
