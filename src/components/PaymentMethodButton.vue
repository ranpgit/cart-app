<template>
  <n-spin :show="loading">
    <template #description> Please wait </template>
    <!-- Stripe -->
    <div
      v-if="method === 'stripe'"
      id="paymentStripe"
      class="payment-method_component"
      @click="pay"
    >
      <div class="payment-method_header">
        <div class="payment-method_heading">
          <img
            src="@/assets/stripe.png"
            loading="lazy"
            alt=""
            class="payment-method_logo no-bg"
          />
          <h3 class="heading-xsmall">Pay with Stripe</h3>
        </div>
        <n-icon size="32">
          <ph-arrow-square-out weight="fill" />
        </n-icon>
      </div>
      <div class="divider"></div>
      <div class="payment-method_icons">
        <img src="@/assets/mastercard.png" class="payment-method_icon" /><img
          src="@/assets/visa.png"
          loading="lazy"
          alt=""
          class="payment-method_icon"
        /><img
          src="@/assets/amex.png"
          loading="lazy"
          alt=""
          class="payment-method_icon"
        /><img
          src="@/assets/applepay.png"
          loading="lazy"
          alt=""
          class="payment-method_icon"
        /><img
          src="@/assets/gpay.png"
          loading="lazy"
          alt=""
          class="payment-method_icon"
        />
      </div>
    </div>
    <!--  -->
    <!--  -->
    <!-- PayPal -->

    <div
      v-if="method === 'paypal'"
      id="paymentPayPal"
      class="payment-method_component"
      @click="pay"
    >
      <div class="payment-method_header">
        <div class="payment-method_heading">
          <img
            src="@/assets/paypal.png"
            loading="lazy"
            alt=""
            class="payment-method_logo"
          />
          <h3 class="heading-xsmall">Pay with PayPal</h3>
        </div>
        <n-icon size="32">
          <ph-arrow-square-out weight="fill" />
        </n-icon>
      </div>
      <div class="divider"></div>
      <div class="payment-method_icons">
        <img
          src="@/assets/mastercard.png"
          loading="lazy"
          alt=""
          class="payment-method_icon"
        />
        <img
          src="@/assets/visa.png"
          loading="lazy"
          alt=""
          class="payment-method_icon"
        />
        <img
          src="@/assets/amex.png"
          loading="lazy"
          alt=""
          class="payment-method_icon"
        />
        <img
          src="@/assets/paypal.png"
          loading="lazy"
          alt=""
          class="payment-method_icon"
        />
      </div>
    </div>
  </n-spin>
</template>

<script>
import axios from "@/client.js";
import { NSpin, NIcon } from "naive-ui";
import { PhArrowSquareOut } from "phosphor-vue";
import { useAppStore } from "../store/app";
export default {
  setup() {
    const store = useAppStore();
    return {
      store
    }
  },
  props: ["method"],
  components: {
    NSpin,
    NIcon,
    PhArrowSquareOut,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async pay() {
      this.loading = true;
      try {
        const result = await axios.post('/campaign/pay', {
          campaignId: this.store.campaignId,
          method: this.method,
        });
        if(result) {
          window.location.href = String(
            result.replace(`"`, "").replace(`"`, "")
          );
        }
      }
      catch (error) {
        console.log(error.response.data.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>
