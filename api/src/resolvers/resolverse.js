"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
/* eslint-disable import/prefer-default-export */
exports.resolvers = {
    Member: {
        fullName: (source) => `${source.firstName} ${source.lastName}`,
    },
};
