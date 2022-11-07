import { useRouter, RouteRecordNormalized } from 'vue-router';
import { useErrData } from './request';
import { Message } from './arco';

export type RoleType = 'admin' | 'user' | '*' | string;
export interface UserType {
  uid: string;
  username?: string;
  nickname?: string;
  avatar?: string;
  mobile?: string;
  email?: string;
  sex?: string;
  weChart?: string;
  qq?: string;
  microBlog?: string;

  role: RoleType;
  name?: string;

  job?: string;
  organization?: string;
  location?: string;
  introduction?: string;
  personalWebsite?: string;
  jobName?: string;
  organizationName?: string;
  locationName?: string;
  phone?: string;
  registrationDate?: string;
  accountId?: string;
  certification?: number;
}

export interface ILoginData {
  username: string;
  password: string;
}

export function userLogout() {
  return new Promise<UserType>((resolve) => {
    resolve({} as UserType);
  });
}
export function userLogin(data: ILoginData) {
  return useErrData<{ token: string; userInfo: UserType }>({ url: 'http://172.16.10.74:9000/oss-user-center/login', method: 'POST', data });
}

export function getUserInfo() {
  return new Promise<UserType>((resolve) => {
    resolve({} as UserType);
  });
}

export function getMenuList() {
  return new Promise<RouteRecordNormalized[]>((resolve) => {
    resolve([]);
  });
}

export default function useUser() {
  const router = useRouter();
  // eslint-disable-next-line no-underscore-dangle
  const Logout = async (logoutTo?: string) => {
    await new Promise<UserType>((resolve) => {
      resolve({} as UserType);
    });
    const currentRoute = router.currentRoute.value;
    Message.success('登出成功');
    router.push({
      name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login',
      query: {
        ...router.currentRoute.value.query,
        redirect: currentRoute.name as string,
      },
    });
  };
  return {
    logout: Logout,
  };
}
