import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeletedResponse } from '../model/deletedResponse';
import { ListProjectResponse } from '../model/listProjectResponse';
import { OrganisationsListPageParameter } from '../model/organisationsListPageParameter';
import { ProjectBody } from '../model/projectBody';
import { ProjectBodyPatch } from '../model/projectBodyPatch';
import { ProjectResponse } from '../model/projectResponse';
import { Configuration } from '../configuration';
import { ProjectsServiceInterface } from './projects.serviceInterface';
import * as i0 from "@angular/core";
export declare class ProjectsService implements ProjectsServiceInterface {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string | string[], configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Get all projects within an organisation
     * Get all the projects linked to a specific organisation
     * @param organisation_id Organisation ID reference
     * @param page Query parameters for pagination
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    organisationsProjectsList(organisation_id: string, page?: OrganisationsListPageParameter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<ListProjectResponse>;
    organisationsProjectsList(organisation_id: string, page?: OrganisationsListPageParameter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<ListProjectResponse>>;
    organisationsProjectsList(organisation_id: string, page?: OrganisationsListPageParameter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<ListProjectResponse>>;
    /**
     * Create project
     * Create a new project
     * @param ProjectBody Create/Update any field
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsCreate(ProjectBody?: ProjectBody, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<ProjectResponse>;
    projectsCreate(ProjectBody?: ProjectBody, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<ProjectResponse>>;
    projectsCreate(ProjectBody?: ProjectBody, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<ProjectResponse>>;
    /**
     * Delete project
     * Delete project, this will also delete all the resources within the project
     * @param project_id Project ID reference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsDelete(project_id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<DeletedResponse>;
    projectsDelete(project_id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<DeletedResponse>>;
    projectsDelete(project_id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<DeletedResponse>>;
    /**
     * Get project
     * Get a specific project
     * @param project_id Project ID reference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsGet(project_id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<ProjectResponse>;
    projectsGet(project_id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<ProjectResponse>>;
    projectsGet(project_id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<ProjectResponse>>;
    /**
     * List projects
     * Get all projects for this user, paginated
     * @param page Query parameters for pagination
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsList(page?: OrganisationsListPageParameter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<ListProjectResponse>;
    projectsList(page?: OrganisationsListPageParameter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<ListProjectResponse>>;
    projectsList(page?: OrganisationsListPageParameter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<ListProjectResponse>>;
    /**
     * Update project
     * Update project
     * @param project_id Project ID reference
     * @param ProjectBodyPatch Update any field
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    projectsUpdate(project_id: string, ProjectBodyPatch?: ProjectBodyPatch, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<ProjectResponse>;
    projectsUpdate(project_id: string, ProjectBodyPatch?: ProjectBodyPatch, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpResponse<ProjectResponse>>;
    projectsUpdate(project_id: string, ProjectBodyPatch?: ProjectBodyPatch, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
    }): Observable<HttpEvent<ProjectResponse>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProjectsService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProjectsService>;
}
