<template>
  <div class="margin-bottom margin-large">
    <n-card
      class="card"
      title="About You"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <template #header-extra>
        <n-tag v-if="status" round :bordered="false" type="success">
          Done
          <template #icon>
            <n-icon>
              <ph-check-circle weight="fill" />
            </n-icon>
          </template>
        </n-tag>
        <n-tag v-else round :bordered="false" type="warning"> Incomplete </n-tag>
      </template>
      <template #action>
        This section applies to all of the services you are ordering below. If
        you would like to order services for different artists, please put them
        in different orders.
      </template>
      <n-form class="form" v-if="metadata">
        <n-space vertical size="large" class="n-space-vertical">
          <n-form-item label="Artist's Spotify Page" class="formItem">
            <n-space vertical class="n-space-vertical">
              <n-input
                placeholder="https://"
                v-model:value="metadata.spotifyArtistId"
                @change="handleChange()"
              />
              <n-alert
                v-if="errors.spotifyArtistId.state"
                title="Error"
                type="error"
              >
                {{ errors.spotifyArtistId.message }}
              </n-alert>
            </n-space>
          </n-form-item>
          <n-collapse>
            <n-collapse-item title="Advanced Details">
              <template #header-extra> Optional </template>
              <n-form-item label="Artist's Genre" class="formItem">
                <n-space vertical class="n-space-vertical">
                  <n-input
                    placeholder="https://"
                    v-model:value="metadata.genre"
                    @change="handleChange()"
                  />
                  <n-alert v-if="errors.genre.state" title="Error" type="error">
                    {{ errors.genre.message }}
                  </n-alert>
                </n-space>
              </n-form-item>
              <n-form-item label="Similar Artists" class="formItem">
                <n-space vertical class="n-space-vertical">
                  <n-input
                    placeholder="https://"
                    v-model:value="metadata.similarArtists"
                    @change="handleChange()"
                  />
                  <n-alert
                    v-if="errors.similarArtists.state"
                    title="Error"
                    type="error"
                  >
                    {{ errors.similarArtists.message }}
                  </n-alert>
                </n-space>
              </n-form-item>
              <n-form-item label="Fanbase Insights" class="formItem">
                <n-space vertical class="n-space-vertical">
                  <n-input
                    placeholder="https://"
                    v-model:value="metadata.fanbaseInsights"
                    @change="handleChange()"
                  />
                  <n-alert
                    v-if="errors.fanbaseInsights.state"
                    title="Error"
                    type="error"
                  >
                    {{ errors.fanbaseInsights.message }}
                  </n-alert>
                </n-space>
              </n-form-item>
            </n-collapse-item>
          </n-collapse>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script>
import {
  NForm,
  NFormItem,
  NInput,
  NAlert,
  NSpace,
  NCard,
  NCollapse,
  NCollapseItem,
  NTag,
  NIcon,
} from "naive-ui";
import {PhCheckCircle} from "phosphor-vue";
import { useAppStore } from '@/store/app'
const regix = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

export default {
  setup() {
    const store = useAppStore();
    return {
      store
    }
  },
  data() {
    return {
      status: false,
      errors: {
        spotifyArtistId: {
          state: false,
          message: "",
        },
        genre: {
          state: false,
          message: "",
        },
        similarArtists: {
          state: false,
          message: "",
        },
        fanbaseInsights: {
          state: false,
          message: "",
        },
      },
    };
  },
  props: ["data"],
  computed: {
    metadata () {
      return this.data;
    }
  },
  mounted() {
    this.validateForm();
  },
  methods: {
    async handleChange () {
      const {
        spotifyArtistId,
        genre,
        similarArtists,
        fanbaseInsights
      } = this.metadata;

      await this.store.updateCampaignDetail({
        spotifyArtistId, genre, similarArtists, fanbaseInsights
      });
      this.validateForm();
    },
    validateForm () {
      const self = this;
      const fields = ['spotifyArtistId', 'genre', 'similarArtists', 'fanbaseInsights']
      this.status = fields.every( field => self.metadata[field])
    },
    validateField (propertyName) {
      if (!regix.test(this.metadata[propertyName])) {
        this.errors[propertyName].state = true
        this.errors[propertyName].message = "Please Enter valid URL"
      } else if (this.metadata[propertyName] === null || this.metadata === '') {
        this.errors[propertyName].state = true
        this.errors[propertyName].message = "Please Enter value"
      } else {
        this.errors[propertyName].state = false
        this.errors[propertyName].message = ""
      }
    }
  },
  watch: {
    "metadata.spotifyArtistId" () {
      this.validateField("spotifyArtistId")
    },
    "metadata.genre" () {
      this.validateField("genre")
    },
    "metadata.similarArtists" () {
      this.validateField("similarArtists")
    },
    "metadata.fanbaseInsights" () {
      this.validateField("fanbaseInsights")
    },

  },
  components: {
    NForm,
    NFormItem,
    NInput,
    NAlert,
    NSpace,
    NCard,
    NCollapse,
    NCollapseItem,
    NTag,
    NIcon,
    PhCheckCircle,
  },
};
</script>

<style scoped>
.card {
  background-color: #4B376D;
  border-radius: 1rem;
  border: none;
}
.background-none {
  background: transparent;
}
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
