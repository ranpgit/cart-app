import { defineStore } from 'pinia'
import axios from "@/client.js";

export const useAppStore = defineStore('app',  {

  state: () => ({
    campaignData: null,
    campaignId: null
    // campaignId: 'campaign-3229625f-f589-4fe2-9a49-76090ed4bc60'
  }),
  actions : {
    async hydrateCampaignList () {
      console.log("hydrateCampaignList")
      console.log("hydrateCampaignList", this.campaignId )
      const result =  await axios.get(`/campaign?campaignId=${this.campaignId}`)
      this.campaignData = result.data
    },

    async cloneCampaignItem (itemId) {
      const result = await axios.post('campaign/item/duplicate', {
        campaignId : this.campaignId,
        itemId: itemId
      });
      this.campaignData = result.data
    },

    async deleteCampaignItem (itemId) {
      const result = await axios.post('campaign/item/remove', {
        campaignId : this.campaignId,
        itemId: itemId
      });
      this.campaignData = result.data
    },

    async  updateCampaignDetail (metadata) {
      const reqPayload = {
        campaignId: this.campaignId,
        metadata
      };
      const result = await axios.post('/campaign/metadata', reqPayload);
      if (result.data) {
        this.campaignData = result.data
      }
    },

    async  updateServiceFormData(payload)  {
      const {itemId, metadata} = payload;
      const reqPayload = {
        campaignId: this.campaignId,
        itemId,
        metadata
      };
      console.log(reqPayload)
      const result = await axios.post('/campaign/item/metadata', reqPayload);
      if (result.data) {
        this.campaignData = result.data
      }
    },

    async updateServiceCost (payload) {
      const {itemId, cost} = payload;
      const reqPayload = {
        campaignId: this.campaignId,
        itemId,
        cost
      };
      const result = await axios.post('/campaign/item/cost', reqPayload);
      if (result.data) {
        this.campaignData = result.data
      }
    },
  }
})
