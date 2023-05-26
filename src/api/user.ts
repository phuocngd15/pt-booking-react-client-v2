//http://localhost:3000/api/users/profile/secoder79@gmail.com

import { deffHttp } from '@/utils/axios';
import { getStorage } from '@/utils/storage';
import type { UseInfoType } from '@/api/auth';
import { rootServer } from '@/api/rootServer';
import type { IActivity } from '@/api/dailyActivitiesTask';
import React from "react";
const userInfo = getStorage<UseInfoType>('userInfo');
// export interface Account {
//     username: string;
//     power: string;
//     key: string;
// }
export const getProfile = (email: string) =>
  deffHttp.get<any>(
    {
      url: `${rootServer}/api/users/profile/${email}`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

export const updateProfile = (user: any, id: string, role: string) => {
  let url;
  if (role === 'trainer') {
    url = `${rootServer}/api/trainers/profile/${id}`;
  }
  if (role === 'customer') {
    url = `${rootServer}/api/users/profile/${id}`;
  }
  return deffHttp.put<any>(
    {
      url: url,
      data: { ...user },
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};
export const getCustomers = () =>
  deffHttp.get<any>(
    {
      url: `${rootServer}/api/users/`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );

export interface Customer {
    key: React.Key;
    _id: string;
    firstName: string;
    fullName: string;
    lastName: string;
    gender: string;
    age: number;
    weight: number;
    height: number;
    address: string;
    tags: string[];
}

export const getMyCustomers = () => {
  const userInfo = getStorage<UseInfoType>('userInfo');
  return deffHttp.get<Customer[]>(
    {
      url: `${rootServer}/api/users/myCustomer/${userInfo?.profile?._id}`,
      data: {},
    },
    { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
  );
};
export const updateMyUserTags = (user: any, id: string) => {
    return deffHttp.put<any>(
        {
            url: `${rootServer}/api/users/profile/${id}`,
            data: { ...user },
        },
        { errorMessageMode: 'modal', useBearerToken: true, bearerToken: userInfo?.token },
    );
};