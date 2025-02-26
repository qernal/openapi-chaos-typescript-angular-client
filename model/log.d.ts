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
import { LogLog } from './logLog';
/**
 * List of logs
 */
export interface Log {
    /**
     * Container ID the log line is for
     */
    container?: string;
    /**
     * Function ID the log line is for
     */
    _function?: string;
    /**
     * Project ID the log line is for
     */
    project?: string;
    /**
     * Organisation ID the log line is for
     */
    organisation?: string;
    /**
     * Group ID the log line is for
     */
    group?: string;
    log?: LogLog;
}
