<template>
  <n-form class="form">
    <n-space vertical size="large" class="n-space-vertical">
      <n-form-item
        v-if="[1, 2].includes(item.service.id)"
        :label="
          item.service.id === 1
            ? 'Song Link'
            : item.service.id === 2
            ? 'Youtube Link'
            : ''
        "
        class="formItem"
      >
        <n-space vertical class="n-space-vertical">
          <n-input
            placeholder="https://"
            v-model:value="metadata.content.links.song"
            @change="handleChange()"
          />
          <n-alert v-if="errors.song.state" title="Error" type="error">
            {{ errors.song.message }}
          </n-alert>
        </n-space>
      </n-form-item>
      <n-form-item
        label="Socials"
        class="formItem"
        v-if="item.service.id === 3"
      >
        <n-layout class="embedded">
          <n-form-item label="Facebook" class="formItem">
            <n-space vertical class="n-space-vertical">
              <n-input
                placeholder="https://"
                v-model:value="metadata.content.links.facebook"
                @change="handleChange()"
              />
              <n-alert v-if="errors.facebook.state" title="Error" type="error">
                {{ errors.facebook.message }}
              </n-alert>
            </n-space>
          </n-form-item>
          <n-form-item label="Instagram" class="formItem">
            <n-space vertical class="n-space-vertical">
              <n-input
                placeholder="https://"
                v-model:value="metadata.content.links.instagram"
                @change="handleChange()"
              />
              <n-alert v-if="errors.instagram.state" title="Error" type="error">
                {{ errors.instagram.message }}
              </n-alert>
            </n-space>
          </n-form-item>
          <n-form-item label="TikTok" class="formItem">
            <n-space vertical class="n-space-vertical">
              <n-input
                placeholder="https://"
                v-model:value="metadata.content.links.tiktok"
                @change="handleChange()"
              />
              <n-alert v-if="errors.tiktok.state" title="Error" type="error">
                {{ errors.tiktok.message }}
              </n-alert>
            </n-space>
          </n-form-item>
        </n-layout>
      </n-form-item>
      <n-form-item label="Your Budget" class="formItem">
        <n-space vertical class="n-space-vertical">
          <n-input-number
            :placeholder="'€'"
            :min="item.service.cost[0].min"
            :max="item.service.cost[0].max"
            v-model:value="cost.net"
            @update:value="handleCostChange()"
          />
          <n-alert v-if="errors.budget.state" title="Error" type="error">
            {{ errors.budget.message }}
          </n-alert>
        </n-space>
      </n-form-item>
      <n-form-item label="Campaign Start Date" class="formItem">
        <n-space vertical class="n-space-vertical">
          <n-date-picker
            v-model:value="metadata.startDate"
            placeholder="Select Start Date"
            format="dd-MM-yyyy"
            type="date"
            :is-date-disabled="allowStartDate"
            @update:value="handleChange()"
          />
          <n-alert v-if="errors.startDate.state" title="Error" type="error">
            {{ errors.startDate.message }}
          </n-alert>
        </n-space>
      </n-form-item>
      <n-form-item label="Campaign End Date" class="formItem">
        <n-space vertical class="n-space-vertical">
          <n-date-picker
            v-model:value="metadata.endDate"
            placeholder="Select End Date"
            :disabled="disableEndDate"
            format="dd-MM-yyyy"
            type="date"
            :is-date-disabled="allowEndDate"
            @update:value="handleChange()"
          />
          <n-alert v-if="errors.endDate.state" title="Error" type="error">
            {{ errors.endDate.message }}
          </n-alert>
        </n-space>
      </n-form-item>
      <n-form-item
        class="formItem"
        label="Upload 4 to 10 videos to be used in your ads (10 seconds each)"
        v-if="[1, 4].includes(item.service.id)"
      >
        <n-space vertical class="n-space-vertical">
          <input type="hidden"
            role="uploadcare-uploader"
            data-public-key="504f17e0687b9e26fb17"
            data-tabs="file camera url facebook gdrive gphotos"
            data-multiple="true"
            data-debug-uploads="true" />
        </n-space>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script>
import {
  NForm,
  NFormItem,
  NDatePicker,
  NLayout,
  NInput,
  NInputNumber,
  NAlert,
  NSpace,
} from "naive-ui";
import { useAppStore } from '@/store/app'
import uploadcare from 'uploadcare-widget/uploadcare.lang.en.min.js'

const regix = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
let uploadcareWidgets;
export default {
  setup () {
    const store = useAppStore()
    return {
      store,
    }
  },
  data() {
    return {
      PUBLIC_KEY: process.env.UPLOADCARE_PUBLIC_KEY,
      cost: {
        net: this.item.cost.net ? this.item.cost.net : '',
      },
      metadata: {
        startDate: this.item.metadata.startDate,
        endDate: this.item.metadata.endDate,
        content: {
          links: {
            song: this.item.metadata.content.links.song,
            facebook: this.item.metadata.content.links.facebook,
            instagram: this.item.metadata.content.links.instagram,
            tiktok: this.item.metadata.content.links.tiktok,
          },
          uploadcareId: this.item.metadata.content.uploadcareId,
        },
      },
      errors: {
        song: {
          state: false,
          message: "Please Enter valid URL",
        },
        facebook: {
          state: false,
          message: "Please Enter valid Facebook URL",
        },
        instagram: {
          state: false,
          message: "Please Enter valid Instagram URL",
        },
        tiktok: {
          state: false,
          message: "Please Enter valid TikTok URL",
        },
        budget: {
          state: false,
          message: "",
        },
        endDate: {
          state: false,
          message: "",
        },
        startDate: {
          state: false,
          message: "",
        },
        upload: {
          state: false,
          message: "",
        },
      },
    };
  },
  computed: {
    disableEndDate() {
      console.log(this.metadata.startDate, this.metadata.startDate === null ? true : false)
      return this.metadata.startDate === null ? true : false;
    }
  },
  props: ["item"],
  mounted() {
    this.$emit("new-cost", this.cost.net);
    this.$emit("form-status", this.validateForm());
    this.initUploadcare()
  },

  methods: {
    async handleChange () {
      const body = {
        itemId: this.item.itemId,
        metadata: this.metadata,
      };
      await this.store.updateServiceFormData(body);
      this.$emit("form-status", this.validateForm());
    },
    async handleCostChange() {
      this.$emit("new-cost", this.cost.net);
      const body = {
        itemId: this.item.itemId,
        cost: this.cost,
      };
      await this.store.updateServiceCost(body);
      this.$emit("form-status", this.validateForm());
    },

    allowStartDate (timestamp) {
      const allowedDate = new Date();
      allowedDate.setDate(allowedDate.getDate() + 3);

      if (this.metadata.endDate !== null) {
        console.log(timestamp <= allowedDate && timestamp > this.metadata.endDate)
        return timestamp < allowedDate || timestamp > this.metadata.endDate
      }
      return timestamp < allowedDate;
    },

    allowEndDate (timestamp) {
      return timestamp <= this.metadata.startDate
    },

    validateURL(value) {
      if (!regix.test(this.metadata.content.links[value]) && this.metadata.content.links[value] != '') {
          this.errors[value]["state"] = true
      } else {
        this.errors[value]["state"] = false
      }
    },
    validateDate (property) {
      const isValid = this.metadata[property] === null
      this.errors[property].state = isValid ? true :false
      this.errors[property].message = isValid ? "Start Date can not be empty" : ""
    },
    validateForm () {
      const obj = this.metadata.content.links;
      switch (this.item.service.id) {
        case 1:
        case 2:
          return this.metadata.content.links.song && this.validateCommonField() ? true : false;
        case 3:
          return obj.facebook && obj.instagram && obj.tiktok && this.validateCommonField() ? true: false;
        case 4:
          return this.validateCommonField();
        default:
          break;
      }
    },
    validateCommonField() {
      return this.cost.net && this.metadata.startDate && this.metadata.endDate ? true : false;
    },
    initUploadcare () {
      const self = this;
      if ([1, 4].includes(this.item.service.id)) {
        uploadcareWidgets = uploadcare.MultipleWidget("[role=uploadcare-uploader]");
        if(this.item.metadata.content.uploadcareId !== 'undefined') {
          uploadcareWidgets.value(this.item.metadata.content.uploadcareId)
        }
        setTimeout(() => {
          uploadcareWidgets.onUploadComplete(groupInfo => {
            const body = {
              itemId: self.item.itemId,
              metadata: {
                content: {
                  uploadcareId: groupInfo.uuid
                }
              }
            };
            console.log(body)
            self.store.updateServiceFormData(body);
          });
        },1000);
      }
    }
  },
  watch: {
    "metadata.content.links.song" () {
      this.validateURL("song");
    },

    "metadata.content.links.facebook" () {
      this.validateURL("facebook");
    },

    "metadata.content.links.instagram" () {
      this.validateURL("instagram");
    },
    "metadata.content.links.tiktok" () {
      this.validateURL("tiktok");
    },
    "cost.net" () {
      const errorObj = this.errors.budget;
      const cost = this.item.service.cost[0];

      if (this.cost.net < cost.min) {
        errorObj.state = true;
        errorObj.message = `Budget must be greater than € ${cost.min}`
      } else if( cost.max && this.cost.net > cost.max) {
        errorObj.state = true;
        errorObj.message = `Budget must be less than € ${cost.max}`
      } else {
        errorObj.state = false
        errorObj.message = ""
      }
    },
    "metadata.startDate" () {
      this.validateDate("startDate")
    },
    "metadata.endDate" () {
      this.validateDate("endDate")
    },
  },
  components: {
    NForm,
    NFormItem,
    NDatePicker,
    NLayout,
    NInput,
    NInputNumber,
    NAlert,
    NSpace,
  },
};

</script>

<style scoped>
.form {
  display: block;
  width: 100%;
}
.formItem {
  width: 100%;
}
.embedded {
  background-color: transparent;
  padding: 1rem;
  border: 1px solid rgba(97, 97, 97, 0.52);
  border-radius: 0.5rem;
  width: 100%;
}
.n-space-vertical {
  width: 100%;
}
</style>
