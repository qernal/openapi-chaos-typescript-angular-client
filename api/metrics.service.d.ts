import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogsListFTimestampsParameter } from '../model/logsListFTimestampsParameter';
import { MetricsAggregationsList200Response } from '../model/metricsAggregationsList200Response';
import { Configuration } from '../configuration';
import { MetricsServiceInterface } from './metrics.serviceInterface';
import * as i0 from "@angular/core";
export declare class MetricsService implements MetricsServiceInterface {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string | string[], configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Get metrics
     * Retrieve metrics for a specific project or function. Use the query parameter to request a metrics report.  &gt; Note: Metrics are always returned in a descending order based on the timestamp.
     * @param metric_type Metric aggregation type, types can be used with either a project or a function filter.  - httprequests: Aggregated HTTP requests - resourcestats: Aggregated resource stats (such as CPU, Memory and Network)  &gt; Note: aggregations cannot return more than 300 data points
     * @param f_project Project uuid reference
     * @param f_function Function uuid reference
     * @param f_timestamps Timestamp restriction for query
     * @param f_histogram_interval Histogram interval
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    metricsAggregationsList(metric_type: 'httprequests' | 'resourcestats', f_project?: string, f_function?: string, f_timestamps?: LogsListFTimestampsParameter, f_histogram_interval?: number, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<MetricsAggregationsList200Response>;
    metricsAggregationsList(metric_type: 'httprequests' | 'resourcestats', f_project?: string, f_function?: string, f_timestamps?: LogsListFTimestampsParameter, f_histogram_interval?: number, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpResponse<MetricsAggregationsList200Response>>;
    metricsAggregationsList(metric_type: 'httprequests' | 'resourcestats', f_project?: string, f_function?: string, f_timestamps?: LogsListFTimestampsParameter, f_histogram_interval?: number, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
        context?: HttpContext;
        transferCache?: boolean;
    }): Observable<HttpEvent<MetricsAggregationsList200Response>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MetricsService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MetricsService>;
}
