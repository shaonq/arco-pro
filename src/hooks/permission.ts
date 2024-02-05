import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';
import type { RoleType } from '@/store/modules/user/types';

export function isRoles(pathRoles: string[], role: RoleType | RoleType[]) {
  if (!pathRoles) throw new Error('The current path does not have permission !');
  const userRoles: RoleType[] = typeof role === 'string' ? [role] : role;
  // console.log( userRoles[0], pathRoles, userRoles.some((r) => pathRoles.includes(r)) );
  return userRoles.some((r) => pathRoles.includes(r));
}

export default function usePermission() {
  const userStore = useUserStore();
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      // console.log(111, route.meta?.roles);
      // return !route.meta?.requiresAuth || !route.meta?.roles || route.meta?.roles?.includes('*') || route.meta?.roles?.includes(userStore.role);
      return !route.meta?.requiresAuth || !route.meta?.roles || route.meta?.roles?.includes('*') || isRoles(route.meta?.roles, userStore.role);
    },
    findFirstPermissionRoute(_routers: any, role: string | string[] = 'admin') {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            // console.log('2222', el);
            return el.includes('*') || isRoles(el, role);
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // You can add any rules you want
  };
}
