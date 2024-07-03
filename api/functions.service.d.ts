import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeletedResponse } from '../model/deletedResponse';
import { Function } from '../model/function';
import { FunctionBody } from '../model/functionBody';
import { ListFunction } from '../model/listFunction';
import { OrganisationsListPageParameter } from '../model/organisationsListPageParameter';
import { Configuration } from '../configuration';
import { FunctionsServiceInterface } from './functions.serviceInterface';
import * as i0 from "@angular/core";
export declare class FunctionsService implements FunctionsServiceInterface {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string | string[], configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Create function
     * Create a new function
     * @param FunctionBody Create/Update any field
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    functionsCreate(FunctionBody: FunctionBody, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<Function>;
    functionsCreate(FunctionBody: FunctionBody, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<Function>>;
    functionsCreate(FunctionBody: FunctionBody, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<Function>>;
    /**
     * Delete function
     * Delete a function (and all revisions)
     * @param function_id Function ID reference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    functionsDelete(function_id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<DeletedResponse>;
    functionsDelete(function_id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<DeletedResponse>>;
    functionsDelete(function_id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<DeletedResponse>>;
    /**
     * Get function (latest revision)
     * Get a specific function (latest revision)
     * @param function_id Function ID reference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    functionsGet(function_id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<Function>;
    functionsGet(function_id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<Function>>;
    functionsGet(function_id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<Function>>;
    /**
     * Get a specific revision of a function
     * Get a specific revision of a function
     * @param function_id Function ID reference
     * @param function_revision_id Function revision ID reference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    functionsRevisionsGet(function_id: string, function_revision_id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<Function>;
    functionsRevisionsGet(function_id: string, function_revision_id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<Function>>;
    functionsRevisionsGet(function_id: string, function_revision_id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<Function>>;
    /**
     * List all revisions for a function
     * List all revisions for a function
     * @param function_id Function ID reference
     * @param page Query parameters for pagination
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    functionsRevisionsList(function_id: string, page?: OrganisationsListPageParameter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<ListFunction>;
    functionsRevisionsList(function_id: string, page?: OrganisationsListPageParameter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<ListFunction>>;
    functionsRevisionsList(function_id: string, page?: OrganisationsListPageParameter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<ListFunction>>;
    /**
     * Update function
     * Update a function (creates a new revision)
     * @param function_id Function ID reference
     * @param Function Update any field
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    functionsUpdate(function_id: string, Function: Function, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<Function>;
    functionsUpdate(function_id: string, Function: Function, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<Function>>;
    functionsUpdate(function_id: string, Function: Function, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<Function>>;
    /**
     * List all functions within a project
     * List all functions
     * @param project_id Project ID reference
     * @param page Query parameters for pagination
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsFunctionsList(project_id: string, page?: OrganisationsListPageParameter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<ListFunction>;
    projectsFunctionsList(project_id: string, page?: OrganisationsListPageParameter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<ListFunction>>;
    projectsFunctionsList(project_id: string, page?: OrganisationsListPageParameter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<ListFunction>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FunctionsService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FunctionsService>;
}
