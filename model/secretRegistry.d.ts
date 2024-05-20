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
 * Encrypted private container registry, `type: registry`
 */
export interface SecretRegistry {
    /**
     * Url to private container repository (for docker registry use docker.io)
     */
    registry: string;
    /**
     * Token used for auth to the registry
     */
    registry_value: string;
}
