<template>
  <div class="office">
    <VueOfficeDocx v-if="hasFormat(['docx'])" :src="prop.src" @rendered="onRendered" @error="onError" />
    <VueOfficeExcel
      v-else-if="hasFormat(['xlsx'])"
      :src="prop.src"
      style="height: 100%"
      :option="{ minColLength: 20 }"
      @rendered="onRendered"
      @error="onError"
    />
    <VueOfficePdf v-else-if="hasFormat(['pdf'])" :src="prop.src" @rendered="onRendered" @error="onError" />
    <a-empty v-else>
      <template #image> <icon-exclamation-circle-fill /> </template>
      Preview not supported
    </a-empty>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import VueOfficeDocx from '@vue-office/docx';
  import VueOfficeExcel from '@vue-office/excel';
  import VueOfficePdf from '@vue-office/pdf';

  import '@vue-office/docx/lib/index.css';
  import '@vue-office/excel/lib/index.css';

  const prop = defineProps({ src: String });

  function hasFormat(suffix2: string[]) {
    const suffix = String(prop.src).split('.');
    if (suffix.length > 1) {
      return suffix2.includes(suffix.slice(-1)[0]);
    }
    return false;
  }

  const loading = ref(true);
  function setLoading(val = false) {
    loading.value = val;
  }
  watch(
    () => prop.src,
    () => setLoading(true)
  );
  function onRendered() {
    setLoading(false);
  }
  const isError = ref(false);
  function onError() {
    setLoading(false);
    isError.value = true;
  }
</script>

<style scoped>
  .office {
    position: relative;
    background: #f4f4f4;
    width: 100%;
    min-height: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
