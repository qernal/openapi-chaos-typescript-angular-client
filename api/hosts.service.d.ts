import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeletedResponse } from '../model/deletedResponse';
import { Host } from '../model/host';
import { HostBody } from '../model/hostBody';
import { HostBodyPatch } from '../model/hostBodyPatch';
import { ListHosts } from '../model/listHosts';
import { OrganisationsListPageParameter } from '../model/organisationsListPageParameter';
import { Configuration } from '../configuration';
import { HostsServiceInterface } from './hosts.serviceInterface';
import * as i0 from "@angular/core";
export declare class HostsService implements HostsServiceInterface {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string | string[], configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Create host for project
     * Assign a host/domain to a project - hosts are globally unique and require verification, so a host cannot be assigned to multiple projects.  A host can be a valid domain, either a root domain or a subdomain.
     * @param project_id Project ID reference
     * @param HostBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsHostsCreate(project_id: string, HostBody: HostBody, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<Host>;
    projectsHostsCreate(project_id: string, HostBody: HostBody, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<Host>>;
    projectsHostsCreate(project_id: string, HostBody: HostBody, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<Host>>;
    /**
     * Delete specific host by hostname
     * @param project_id Project ID reference
     * @param hostname Hostname
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsHostsDelete(project_id: string, hostname: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<DeletedResponse>;
    projectsHostsDelete(project_id: string, hostname: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<DeletedResponse>>;
    projectsHostsDelete(project_id: string, hostname: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<DeletedResponse>>;
    /**
     * Get specific host by hostname
     * @param project_id Project ID reference
     * @param hostname Hostname
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsHostsGet(project_id: string, hostname: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<Host>;
    projectsHostsGet(project_id: string, hostname: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<Host>>;
    projectsHostsGet(project_id: string, hostname: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<Host>>;
    /**
     * List hosts for project
     * @param project_id Project ID reference
     * @param page Query parameters for pagination
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsHostsList(project_id: string, page?: OrganisationsListPageParameter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<ListHosts>;
    projectsHostsList(project_id: string, page?: OrganisationsListPageParameter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<ListHosts>>;
    projectsHostsList(project_id: string, page?: OrganisationsListPageParameter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<ListHosts>>;
    /**
     * Update specific host by hostname
     * @param project_id Project ID reference
     * @param hostname Hostname
     * @param HostBodyPatch
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsHostsUpdate(project_id: string, hostname: string, HostBodyPatch: HostBodyPatch, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<Host>;
    projectsHostsUpdate(project_id: string, hostname: string, HostBodyPatch: HostBodyPatch, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<Host>>;
    projectsHostsUpdate(project_id: string, hostname: string, HostBodyPatch: HostBodyPatch, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<Host>>;
    /**
     * Schedule host verification task
     * @param project_id Project ID reference
     * @param hostname Hostname
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsHostsVerifyCreate(project_id: string, hostname: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<Host>;
    projectsHostsVerifyCreate(project_id: string, hostname: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<Host>>;
    projectsHostsVerifyCreate(project_id: string, hostname: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<Host>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HostsService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HostsService>;
}
