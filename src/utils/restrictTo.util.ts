import { SetMetadata } from '@nestjs/common';

export const RestrictTo = (role: string) => SetMetadata('role', role);