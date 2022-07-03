/* eslint-disable import/prefer-default-export */
export const resolvers = {
  Member: {
    fullName: (source: any) => `${source.firstName} ${source.lastName}`,
  },
}
