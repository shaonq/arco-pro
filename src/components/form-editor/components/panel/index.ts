import VOptionsUnknown from './v-options-unknown.vue';

const fields = import.meta.globEager('./*.vue');
export function getOptionsComponentName(name: string) {
  const fieldKey = Object.keys(fields).find((key) => {
    return key.indexOf(`v-options-${name}.vue`) !== -1;
  });
  if (fieldKey && fields[fieldKey]) return fields[fieldKey].default;
  return VOptionsUnknown;
}

export default null;
