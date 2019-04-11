import { Brand } from 'src/app/model/brand';

export interface ApiResult<T> {
    data: T;
    error: any;
}
