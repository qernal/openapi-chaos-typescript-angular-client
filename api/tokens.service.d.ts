import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthToken } from '../model/authToken';
import { AuthTokenBody } from '../model/authTokenBody';
import { AuthTokenMeta } from '../model/authTokenMeta';
import { AuthTokenPatch } from '../model/authTokenPatch';
import { DeletedResponse } from '../model/deletedResponse';
import { ListAuthTokens } from '../model/listAuthTokens';
import { OrganisationsListPageParameter } from '../model/organisationsListPageParameter';
import { Configuration } from '../configuration';
import { TokensServiceInterface } from './tokens.serviceInterface';
import * as i0 from "@angular/core";
export declare class TokensService implements TokensServiceInterface {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string | string[], configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Create new auth token
     * Create new auth token for use with the CLI and TF Provider  ### Warning The &#x60;token&#x60; field is only shown once and can\&#39;t be retrieved again without generating a new token. Securely save this once the response has been received.
     * @param AuthTokenBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    authTokensCreate(AuthTokenBody: AuthTokenBody, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<AuthToken>;
    authTokensCreate(AuthTokenBody: AuthTokenBody, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<AuthToken>>;
    authTokensCreate(AuthTokenBody: AuthTokenBody, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<AuthToken>>;
    /**
     * Delete token
     * @param token_id Token ID reference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    authTokensDelete(token_id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<DeletedResponse>;
    authTokensDelete(token_id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<DeletedResponse>>;
    authTokensDelete(token_id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<DeletedResponse>>;
    /**
     * Get token information
     * @param token_id Token ID reference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    authTokensGet(token_id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<AuthTokenMeta>;
    authTokensGet(token_id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<AuthTokenMeta>>;
    authTokensGet(token_id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<AuthTokenMeta>>;
    /**
     * List all user auth tokens
     * @param page Query parameters for pagination
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    authTokensList(page?: OrganisationsListPageParameter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<ListAuthTokens>;
    authTokensList(page?: OrganisationsListPageParameter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<ListAuthTokens>>;
    authTokensList(page?: OrganisationsListPageParameter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<ListAuthTokens>>;
    /**
     * Update token
     * @param token_id Token ID reference
     * @param AuthTokenPatch
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    authTokensUpdate(token_id: string, AuthTokenPatch: AuthTokenPatch, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<AuthToken>;
    authTokensUpdate(token_id: string, AuthTokenPatch: AuthTokenPatch, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<AuthToken>>;
    authTokensUpdate(token_id: string, AuthTokenPatch: AuthTokenPatch, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<AuthToken>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TokensService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TokensService>;
}
