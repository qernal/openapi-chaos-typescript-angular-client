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
export interface FunctionRoute {
    /**
     * Can be a regular expression
     */
    path: string;
    /**
     * HTTP Verb(s) for this function
     */
    methods: Array<string>;
    /**
     * The route weight for consideration
     */
    weight: number;
}