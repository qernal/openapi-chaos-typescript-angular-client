import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListLogResponse } from '../model/listLogResponse';
import { LogsListFTimestampsParameter } from '../model/logsListFTimestampsParameter';
import { OrganisationsListPageParameter } from '../model/organisationsListPageParameter';
import { Configuration } from '../configuration';
import { LogsServiceInterface } from './logs.serviceInterface';
import * as i0 from "@angular/core";
export declare class LogsService implements LogsServiceInterface {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string | string[], configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Get logs
     * Retrieve logs for a specific project or function. Use the query parameter to search logs.  &gt; Note: Logs are always returned in a descending order based on the timestamp. &gt; Note: A max size of 500 logs is returned per request (when using page[size]).
     * @param page Query parameters for pagination
     * @param f_project Project uuid reference
     * @param f_function Function uuid reference
     * @param f_timestamps Timestamp restriction for query
     * @param f_query Text query string
     * @param f_log_type Type of log
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    logsList(page?: OrganisationsListPageParameter, f_project?: string, f_function?: string, f_timestamps?: LogsListFTimestampsParameter, f_query?: string, f_log_type?: 'info' | 'error', observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<ListLogResponse>;
    logsList(page?: OrganisationsListPageParameter, f_project?: string, f_function?: string, f_timestamps?: LogsListFTimestampsParameter, f_query?: string, f_log_type?: 'info' | 'error', observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<ListLogResponse>>;
    logsList(page?: OrganisationsListPageParameter, f_project?: string, f_function?: string, f_timestamps?: LogsListFTimestampsParameter, f_query?: string, f_log_type?: 'info' | 'error', observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<ListLogResponse>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LogsService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LogsService>;
}
