export interface IUser {
  name: string;
  postsCount: number;
  onClick?(): void;
  active?: boolean;
}
