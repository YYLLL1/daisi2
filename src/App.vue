<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  // support Multi-language
  const { getAntdLocale } = useLocale();

  useTitle();
</script>
<style>
  .ly-container {
    padding: 20px;
    height: 100%;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
  .no-padding {
    padding: 0 !important;
  }
  .pd10 {
    padding: 10px !important;
  }
  .no-margin {
    margin: 0 !important;
  }
  .mg-t10 {
    margin-top: 10px !important;
  }
  .mg-t20 {
    margin-top: 20px !important;
  }
</style>
