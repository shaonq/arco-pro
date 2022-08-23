<template>
  <a-spin :loading="loading" style="width: 100%">
    <EnterpriseCertification :enterprise-info="data.enterpriseInfo" />
    <CertificationRecords :render-data="data.record" />
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import useLoading from '@/hooks/loading';
  import EnterpriseCertification from './enterprise-certification.vue';
  import CertificationRecords from './certification-records.vue';

  const data = reactive({
    enterpriseInfo: [],
    record: [],
  });
  const { loading, setLoading } = useLoading(true);
</script>

<style scoped lang="less"></style>
