import { clearLoginData } from './auth';
import { pushToEventQueue } from './push-to-event-queue';

export const configurableFetch = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then((response: Response) => {
    console.log('response', response);
    if (response.status === 401) {
      clearLoginData();

      pushToEventQueue(() => (document.location.href = '/'));

      return Promise.reject(response);
    }
    return response;
  });
