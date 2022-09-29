<template>
  <div
    id="w-node-_86076336-b251-8e3e-88cb-7b7d9fd60a7b-08e05dff"
    data-w-id="86076336-b251-8e3e-88cb-7b7d9fd60a7b"
    class="order-box_component"
  >
    <div class="order-box_content-wrapper">
      <a
        data-w-id="beb50bf0-5877-8877-8ac1-aa4a3f5213d3"
        href="#"
        class="button w-button"
        @click="showModal = true"
        >Buy Now</a
      >
      <div class="text-size-small text-align-center">
        By placing your order you agree to PitchBridge&#x27;s
        <a target="AmazonHelp" href="#" class="text-style-link"
          >Terms and Conditions</a
        >.
      </div>
    </div>
    <div class="order-box_content-wrapper is-highlighted">
      <div class="text-align-center">30-day money back guarantee</div>
    </div>
  </div>
  <n-modal v-model:show="showModal">
    <n-card
      class="modal-card"
      title="Pick your payment method"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-space vertical size="large">
        <PaymentMethodButton method="stripe" />
        <PaymentMethodButton method="paypal" />
      </n-space>
    </n-card>
  </n-modal>
</template>

<script>
import { NModal, NCard, NSpace } from "naive-ui";

export default {
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    NModal,
    NCard,
    NSpace,
  },
};
</script>

<style scoped>
.modal-card {
  width: 75vw;
  max-width: 600px;
  @media only screen and (max-width: 600px) {
    width: 99vw;
  }
}
</style>