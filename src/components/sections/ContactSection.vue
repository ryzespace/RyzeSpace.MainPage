<template>
  <section id="contact" class="py-20 bg-neutral-50 dark:bg-[#0E121B] border-b border-neutral-200 dark:border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-5 space-y-6">
          <div>
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              {{ t.contact.title }}
            </h2>
            <p class="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              {{ t.contact.subtitle }}
            </p>
          </div>

          <div class="p-5 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-neutral-900 dark:text-white">
                {{ t.contact.newsletterTitle }}
              </h3>
              <span class="text-[10px] font-mono text-neutral-400 uppercase">Resend API</span>
            </div>
            <p class="text-xs text-neutral-500">
              {{ t.contact.newsletterDesc }}
            </p>

            <form @submit.prevent="handleNewsletterSubmit" class="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                v-model="newsletterEmail"
                type="email"
                required
                :placeholder="t.contact.newsletterPlaceholder"
                class="flex-1 px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#F38020]"
              />
              <button
                type="submit"
                :disabled="isSubscribing"
                class="px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] disabled:opacity-50 transition-colors shrink-0"
              >
                <span v-if="isSubscribing">Dispatching...</span>
                <span v-else>{{ t.contact.subscribe }}</span>
              </button>
            </form>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-lg font-bold text-neutral-900 dark:text-white">
                {{ t.contact.contactForm }}
              </h3>
            </div>
            <form @submit.prevent="handleContactSubmit" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {{ t.contact.name }} *
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Alex"
                    class="w-full px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#F38020]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {{ t.contact.surname }} *
                  </label>
                  <input
                    v-model="form.surname"
                    type="text"
                    required
                    placeholder="Kowalski"
                    class="w-full px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#F38020]"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {{ t.contact.email }} *
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    class="w-full px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#F38020]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {{ t.contact.topic }} *
                  </label>
                  <select
                    v-model="form.topic"
                    class="w-full px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#F38020]"
                  >
                    <option v-for="tag in t.contact.tags" :key="tag" :value="tag">
                      {{ tag }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {{ t.contact.message }} *
                </label>
                <textarea
                  v-model="form.message"
                  required
                  rows="4"
                  placeholder="Describe your workload, required compute specs, or question..."
                  class="w-full px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#F38020]"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-2.5 px-4 rounded-md text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] disabled:opacity-50 transition-colors"
              >
                <span v-if="isSubmitting">Dispatching via Resend...</span>
                <span v-else>{{ t.contact.send }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { useToastStore } from '@/stores/toast';
import { sendEmailViaResend } from '@/services/resend';

const i18nStore = useI18nStore();
const toastStore = useToastStore();
const t = computed(() => i18nStore.t);

const newsletterEmail = ref('');
const isSubscribing = ref(false);

const isSubmitting = ref(false);
const form = ref({
  name: '',
  surname: '',
  email: '',
  topic: 'General Inquiry',
  message: '',
});

async function handleNewsletterSubmit() {
  if (!newsletterEmail.value) return;
  isSubscribing.value = true;

  await sendEmailViaResend({
    to: newsletterEmail.value,
    subject: 'Welcome to RyzeSpace Global Telemetry Newsletter',
    html: `<p>Thank you for subscribing to RyzeSpace Telemetry updates with ${newsletterEmail.value}.</p>`,
  });

  isSubscribing.value = false;
  newsletterEmail.value = '';
  toastStore.success('Subscribed to Global Telemetry Newsletter via Resend.');
}

async function handleContactSubmit() {
  isSubmitting.value = true;

  await sendEmailViaResend({
    to: 'support@ryzespace.io',
    subject: `[${form.value.topic}] Contact from ${form.value.name} ${form.value.surname}`,
    html: `
      <h2>New Enterprise Inquiry</h2>
      <p><strong>From:</strong> ${form.value.name} ${form.value.surname} (${form.value.email})</p>
      <p><strong>Topic:</strong> ${form.value.topic}</p>
      <p><strong>Message:</strong></p>
      <p>${form.value.message}</p>
    `,
  });

  isSubmitting.value = false;
  form.value = {
    name: '',
    surname: '',
    email: '',
    topic: 'General Inquiry',
    message: '',
  };
  toastStore.success(t.value.contact.successMessage);
}
</script>
