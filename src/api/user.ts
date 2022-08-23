import type { RouteRecordNormalized } from 'vue-router';

export interface LoginData {
  username: string;
  password: string;
}

const userResData = {
  code: 0,
  data: {
    name: '王立群',
    avatar: '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
    email: 'wangliqun@email.com',
    job: 'frontend',
    jobName: '前端艺术家',
    organization: 'Frontend',
    organizationName: '前端',
    location: 'beijing',
    locationName: '北京',
    introduction: '人潇洒，性温存',
    personalWebsite: 'https://www.arco.design',
    phone: '150****0000',
    registrationDate: '2013-05-10 12:10:00',
    accountId: '15012312300',
    certification: 1,
    role: 'admin',
    token: '123456789',
  },
};

type typeUserResData = typeof userResData;

export function login() {
  return new Promise<typeUserResData>((resolve) => {
    resolve(userResData);
  });
}

export function getUserInfo() {
  return new Promise<typeUserResData>((resolve) => {
    resolve(userResData);
  });
}

export function logout() {
  return new Promise<typeUserResData>((resolve) => {
    resolve(userResData);
  });
}

export function getMenuList() {
  return new Promise<RouteRecordNormalized[]>((resolve) => {
    resolve([]);
  });
}
