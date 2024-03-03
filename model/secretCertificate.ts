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
 * Encrypted SSL private key and plain certificate. Certificate expected in x509 pem format, key expected in pkcs8 or pkcs1 pem format. `type: certificate`
 */
export interface SecretCertificate { 
    /**
     * Public certificate
     */
    certificate: string;
    /**
     * Encrypted certificate private key
     */
    certificate_value: string;
}

