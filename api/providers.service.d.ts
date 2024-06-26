import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListProviderResponse } from '../model/listProviderResponse';
import { OrganisationsListPageParameter } from '../model/organisationsListPageParameter';
import { Configuration } from '../configuration';
import { ProvidersServiceInterface } from './providers.serviceInterface';
import * as i0 from "@angular/core";
export declare class ProvidersService implements ProvidersServiceInterface {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string | string[], configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Get available providers
     * Retrieve a list of all providers with their respective deployed regions and cities.
     * @param page Query parameters for pagination
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    providersList(page?: OrganisationsListPageParameter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<ListProviderResponse>;
    providersList(page?: OrganisationsListPageParameter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<ListProviderResponse>>;
    providersList(page?: OrganisationsListPageParameter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<ListProviderResponse>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProvidersService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProvidersService>;
}
