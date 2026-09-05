import type { Request } from 'express';

import type { AuthPayload } from './auth-payload.type';

// Define una request de Express que ya fue autenticada
export type AuthenticatedRequest = Request & {

  // Contiene la información de autenticación agregada a la request
  auth: {

    // Contiene los datos validados del token
    payload: AuthPayload;
  };
};