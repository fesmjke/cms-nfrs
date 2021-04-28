import { $CombinedState } from 'redux';
import { StateType } from 'typesafe-actions';
import { IAuthState } from './reducers/auth/types';

export type Store = StateType<typeof import('./index').default>;
export type RootState = {
    readonly [$CombinedState]?: undefined;
} & {
    auth : IAuthState
}
export type AuthActions = StateType<typeof import('./reducers/auth/actions')>