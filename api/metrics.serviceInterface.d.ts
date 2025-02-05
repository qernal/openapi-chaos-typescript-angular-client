/**
 * Chaos
 * Central Management API - publicly exposed set of APIs for managing deployments
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@qernal.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogsListFTimestampsParameter } from '../model/models';
import { MetricsAggregationsList200Response } from '../model/models';
import { OrganisationsListPageParameter } from '../model/models';
import { Configuration } from '../configuration';
export interface MetricsServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    /**
     * Get metrics
     * Retrieve metrics for a specific project or function. Use the query parameter to request a metrics report.  &gt; Note: Metrics are always returned in a descending order based on the timestamp.
     * @param metric_type Metric aggregation type, types can be used with either a project or a function filter.  - httprequests: Aggregated HTTP requests - resourcestats: Aggregated resource stats (such as CPU, Memory and Network)  &gt; Note: aggregations cannot return more than 300 data points
     * @param page Query parameters for pagination
     * @param f_project Project uuid reference
     * @param f_function Function uuid reference
     * @param f_timestamps Timestamp restriction for query
     * @param f_histogram_interval Histogram interval
     */
    metricsAggregationsList(metric_type: 'httprequests' | 'resourcestats', page?: OrganisationsListPageParameter, f_project?: string, f_function?: string, f_timestamps?: LogsListFTimestampsParameter, f_histogram_interval?: number, extraHttpRequestParams?: any): Observable<MetricsAggregationsList200Response>;
}
