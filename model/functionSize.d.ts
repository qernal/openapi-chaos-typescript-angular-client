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
/**
 * Size of function, required CPU and Memory
 */
export interface FunctionSize {
    /**
     * CPU in 0.1 vCPU increments, for a whole vCPU specify 1024 Must be in multiples of 128, with the same multiplier as memory
     */
    cpu: number;
    /**
     * Memory in 128 MB increments, values are integer always in MB Must be in multiples of 128, with the same multiplier as CPU
     */
    memory: number;
}
