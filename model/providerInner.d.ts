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
import { ProviderInnerLocations } from './providerInnerLocations';
export interface ProviderInner {
    id?: string;
    /**
     * Name of provider
     */
    name?: string;
    locations?: ProviderInnerLocations;
}
