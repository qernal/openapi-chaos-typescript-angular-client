import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeletedResponse } from '../model/deletedResponse';
import { ListSecretResponse } from '../model/listSecretResponse';
import { OrganisationsListPageParameter } from '../model/organisationsListPageParameter';
import { SecretBody } from '../model/secretBody';
import { SecretBodyPatch } from '../model/secretBodyPatch';
import { SecretMetaResponse } from '../model/secretMetaResponse';
import { SecretMetaType } from '../model/secretMetaType';
import { SecretResponse } from '../model/secretResponse';
import { Configuration } from '../configuration';
import { SecretsServiceInterface } from './secrets.serviceInterface';
import * as i0 from "@angular/core";
export declare class SecretsService implements SecretsServiceInterface {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string | string[], configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Create project secret
     * Create a new project secret
     * @param project_id Project ID reference
     * @param SecretBody Create/Update any field  The example generated may only be for one of the secret types, look towards the payload section of the schema for further fields, values and examples.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsSecretsCreate(project_id: string, SecretBody: SecretBody, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<SecretResponse>;
    projectsSecretsCreate(project_id: string, SecretBody: SecretBody, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<SecretResponse>>;
    projectsSecretsCreate(project_id: string, SecretBody: SecretBody, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<SecretResponse>>;
    /**
     * Delete project secret
     * Delete project secret, if the secret is still linked to an active/deployed function - it cannot be removed
     * @param project_id Project ID reference
     * @param secret_name Unique secret name
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsSecretsDelete(project_id: string, secret_name: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<DeletedResponse>;
    projectsSecretsDelete(project_id: string, secret_name: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<DeletedResponse>>;
    projectsSecretsDelete(project_id: string, secret_name: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<DeletedResponse>>;
    /**
     * Get project secret
     * Get a specific project
     * @param project_id Project ID reference
     * @param secret_name Unique secret name
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsSecretsGet(project_id: string, secret_name: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<SecretMetaResponse>;
    projectsSecretsGet(project_id: string, secret_name: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<SecretMetaResponse>>;
    projectsSecretsGet(project_id: string, secret_name: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<SecretMetaResponse>>;
    /**
     * List project secrets of a specific type
     * List project secrets of a specific type
     * @param project_id Project ID reference
     * @param page Query parameters for pagination
     * @param secret_type Type of secret to filter on
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsSecretsList(project_id: string, page?: OrganisationsListPageParameter, secret_type?: SecretMetaType, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<ListSecretResponse>;
    projectsSecretsList(project_id: string, page?: OrganisationsListPageParameter, secret_type?: SecretMetaType, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<ListSecretResponse>>;
    projectsSecretsList(project_id: string, page?: OrganisationsListPageParameter, secret_type?: SecretMetaType, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<ListSecretResponse>>;
    /**
     * Update project secret
     * Update project
     * @param project_id Project ID reference
     * @param secret_name Unique secret name
     * @param SecretBodyPatch Update any field
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsSecretsUpdate(project_id: string, secret_name: string, SecretBodyPatch: SecretBodyPatch, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<SecretResponse>;
    projectsSecretsUpdate(project_id: string, secret_name: string, SecretBodyPatch: SecretBodyPatch, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<SecretResponse>>;
    projectsSecretsUpdate(project_id: string, secret_name: string, SecretBodyPatch: SecretBodyPatch, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<SecretResponse>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SecretsService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SecretsService>;
}
