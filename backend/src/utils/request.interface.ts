import { Request } from "express";

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }
  
  export type ExtendedRequest = Request; // Export the extended Request type