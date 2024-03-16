export const toJson = (res: {
  json: () => Promise<any>,
  [key: string]: any
}) => res.json();