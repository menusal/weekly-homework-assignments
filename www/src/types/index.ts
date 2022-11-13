export type Item = {
  [key: string]:
    | string
    | number
    | boolean
    | Date
    | undefined
    | React.ReactNode
    | React.ReactNode[]
    | {
        [key: string]:
          | string
          | number
          | boolean
          | Date
          | undefined
          | React.ReactNode
          | React.ReactNode[];
      };
};
