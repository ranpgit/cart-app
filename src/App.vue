<template>
  <n-config-provider :theme="darkTheme">
    <div class="margin-bottom margin-large">
      <Header
        v-if="store.campaignData !== null"
        :itemLength="store.campaignData.items.length"
      />
    </div>
    <div v-if="store.campaignData !== null" class="cart-main">
      <div class="cart-items">
        <Suspense>
          <n-space vertical space="large">
            <CampaignForm :data="store.campaignData.metadata"/>
            <ServiceList />
          </n-space>
          <template #fallback> Loading... </template>
        </Suspense>
      </div>
      <Buy />
    </div>
  </n-config-provider>
</template>

<script>
import { defineComponent } from "vue";
import { darkTheme, NConfigProvider, NSpace } from "naive-ui";
import { useAppStore } from '@/store/app'
export default defineComponent({
  setup() {
    const store  = useAppStore()
    return {
      store,
      darkTheme,
    };
  },
  data() {
    return {
      items: [],
      metadata: {
        fanbaseInsights: null,
        genre : null,
        similarArtists: null,
        spotifyArtistId: null,
      },
    }
  },
  components: {
    NConfigProvider,
    NSpace,
  },
  async created () {
    const params = new URLSearchParams(window.location.search);
    this.store.campaignId = params.get("campaignId") ? params.get("campaignId") : localStorage.getItem("campaignId");

    if(localStorage.getItem("campaignId") === ""){
      localStorage.setItem("campaignId", this.store.campaignId );
    }

    await this.store.hydrateCampaignList();
  }
});
</script>

<style>
</style>
