export * from './configurable-fetch';
export * from './auth';
export * from './wallet';
export * from './copy-to-clipboard';
export * from './format-address';
export * from './event-emitter';
export * from './any-function';
export * from './hooks';
export * from './get-all-method-names';
export * from './get-all-prototype-method-names';
export * from './push-to-event-queue';
export * from './log-error';
export * from './get-next-sunday-utc-0';
export * from './date';
export * from './formatNumber';
export const getChainNameBySubDomain = () => document.location.host.split('-')[0].split('.')[0].toLowerCase();
// export const getChainNameBySubDomain = () => 'tron'
