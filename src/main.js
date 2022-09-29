// import Vue from "vue";
import { createApp } from "vue";
import App from "./App.vue";
import Buy from "./components/Buy.vue";
import Empty from "./components/Empty.vue";
import Header from "./components/Header.vue";
import ServiceCard from "./components/ServiceCard.vue";
import ServiceForm from "./components/ServiceForm.vue";
import ServiceList from "./components/ServiceList.vue";
import PaymentMethodButton from "./components/PaymentMethodButton.vue";
import CampaignForm from "./components/CampaignForm.vue";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPersist);
app.use(pinia);
app.component("App", App);
app.component("Buy", Buy);
app.component("Empty", Empty);
app.component("Header", Header);
app.component("ServiceCard", ServiceCard);
app.component("ServiceForm", ServiceForm);
app.component("ServiceList", ServiceList);
app.component("PaymentMethodButton", PaymentMethodButton);
app.component("CampaignForm", CampaignForm);
app.mount("#app");
