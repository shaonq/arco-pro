import VFormUnknown from './v-form-unknown.vue';

const fields = import.meta.globEager('./*.vue');
export function getComponentName(name: string) {
  const fieldKey = Object.keys(fields).find((key) => {
    return key.indexOf(`v-form-${name}.vue`) !== -1;
  });
  if (fieldKey && fields[fieldKey]) return fields[fieldKey].default;
  return VFormUnknown;
}

export default null;
