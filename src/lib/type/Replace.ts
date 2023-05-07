export type Replace<L, R> = Omit<L, keyof R> & R
