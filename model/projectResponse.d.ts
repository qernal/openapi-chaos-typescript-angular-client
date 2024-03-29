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
import { ModelDate } from './modelDate';
/**
 * Project response
 */
export interface ProjectResponse {
    /**
     * Project id
     */
    id: string;
    /**
     * Organisation id
     */
    org_id: string;
    /**
     * Project name
     */
    name: string;
    date: ModelDate;
}
