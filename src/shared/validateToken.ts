import { context } from "../context";

export const validateToken = async (token: string): Promise<boolean> => {
  const result = await context.prisma.tokens.findUnique({
    where: { token: token },
  });

  if (!result || result.expiresAt < new Date()) return false;

  return true;
};
