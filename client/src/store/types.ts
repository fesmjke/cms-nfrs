import { $CombinedState } from 'redux';
import { StateType } from 'typesafe-actions';
import { IAuthState } from './reducers/auth/types';
import { ICartState } from './reducers/cart/types';
import { ICategoriesState } from './reducers/categories/types';
import { IProductState } from './reducers/product/types';

export type Store = StateType<typeof import('./index').default>;
export type RootState = {
    readonly [$CombinedState]?: undefined;
} & {
    auth : IAuthState,
    category : ICategoriesState,
    product : IProductState,
    cart : ICartState
}
export type AuthActions = StateType<typeof import('./reducers/auth/actions')>