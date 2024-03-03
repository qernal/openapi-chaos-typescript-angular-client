import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, NgModule, SkipSelf } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

/**
 * Custom HttpParameterCodec
 * Workaround for https://github.com/angular/angular/issues/18261
 */
class CustomHttpParameterCodec {
    encodeKey(k) {
        return encodeURIComponent(k);
    }
    encodeValue(v) {
        return encodeURIComponent(v);
    }
    decodeKey(k) {
        return decodeURIComponent(k);
    }
    decodeValue(v) {
        return decodeURIComponent(v);
    }
}

const BASE_PATH = new InjectionToken('basePath');
const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};

class Configuration {
    /**
     *  @deprecated Since 5.0. Use credentials instead
     */
    apiKeys;
    username;
    password;
    /**
     *  @deprecated Since 5.0. Use credentials instead
     */
    accessToken;
    basePath;
    withCredentials;
    /**
     * Takes care of encoding query- and form-parameters.
     */
    encoder;
    /**
     * Encoding of various path parameter
     * <a href="https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#style-values">styles</a>.
     * <p>
     * See {@link README.md} for more details
     * </p>
     */
    encodeParam;
    /**
     * The keys are the names in the securitySchemes section of the OpenAPI
     * document. They should map to the value used for authentication
     * minus any standard prefixes such as 'Basic' or 'Bearer'.
     */
    credentials;
    constructor(configurationParameters = {}) {
        this.apiKeys = configurationParameters.apiKeys;
        this.username = configurationParameters.username;
        this.password = configurationParameters.password;
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.withCredentials = configurationParameters.withCredentials;
        this.encoder = configurationParameters.encoder;
        if (configurationParameters.encodeParam) {
            this.encodeParam = configurationParameters.encodeParam;
        }
        else {
            this.encodeParam = param => this.defaultEncodeParam(param);
        }
        if (configurationParameters.credentials) {
            this.credentials = configurationParameters.credentials;
        }
        else {
            this.credentials = {};
        }
        // init default token credential
        if (!this.credentials['token']) {
            this.credentials['token'] = () => {
                return typeof this.accessToken === 'function'
                    ? this.accessToken()
                    : this.accessToken;
            };
        }
        // init default cookie credential
        if (!this.credentials['cookie']) {
            this.credentials['cookie'] = () => {
                if (this.apiKeys === null || this.apiKeys === undefined) {
                    return undefined;
                }
                else {
                    return this.apiKeys['cookie'] || this.apiKeys['qernal_kratos_session'];
                }
            };
        }
    }
    /**
     * Select the correct content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param contentTypes - the array of content types that are available for selection
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderContentType(contentTypes) {
        if (contentTypes.length === 0) {
            return undefined;
        }
        const type = contentTypes.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    }
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderAccept(accepts) {
        if (accepts.length === 0) {
            return undefined;
        }
        const type = accepts.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    }
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    isJsonMime(mime) {
        const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
    lookupCredential(key) {
        const value = this.credentials[key];
        return typeof value === 'function'
            ? value()
            : value;
    }
    defaultEncodeParam(param) {
        // This implementation exists as fallback for missing configuration
        // and for backwards compatibility to older typescript-angular generator versions.
        // It only works for the 'simple' parameter style.
        // Date-handling only works for the 'date-time' format.
        // All other styles and Date-formats are probably handled incorrectly.
        //
        // But: if that's all you need (i.e.: the most common use-case): no need for customization!
        const value = param.dataFormat === 'date-time' && param.value instanceof Date
            ? param.value.toISOString()
            : param.value;
        return encodeURIComponent(String(value));
    }
}

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
/* tslint:disable:no-unused-variable member-ordering */
class HostsService {
    httpClient;
    basePath = 'https://chaos.qernal.com/v1';
    defaultHeaders = new HttpHeaders();
    configuration = new Configuration();
    encoder;
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    // @ts-ignore
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substring(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    projectsHostsCreate(project_id, HostBody, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsHostsCreate.');
        }
        if (HostBody === null || HostBody === undefined) {
            throw new Error('Required parameter HostBody was null or undefined when calling projectsHostsCreate.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/hosts`;
        return this.httpClient.request('post', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: HostBody,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsHostsDelete(project_id, hostname, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsHostsDelete.');
        }
        if (hostname === null || hostname === undefined) {
            throw new Error('Required parameter hostname was null or undefined when calling projectsHostsDelete.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/hosts/${this.configuration.encodeParam({ name: "hostname", value: hostname, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined })}`;
        return this.httpClient.request('delete', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsHostsGet(project_id, hostname, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsHostsGet.');
        }
        if (hostname === null || hostname === undefined) {
            throw new Error('Required parameter hostname was null or undefined when calling projectsHostsGet.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/hosts/${this.configuration.encodeParam({ name: "hostname", value: hostname, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined })}`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsHostsList(project_id, page, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsHostsList.');
        }
        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, page, 'page');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/hosts`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            params: localVarQueryParameters,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsHostsUpdate(project_id, hostname, HostBodyPatch, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsHostsUpdate.');
        }
        if (hostname === null || hostname === undefined) {
            throw new Error('Required parameter hostname was null or undefined when calling projectsHostsUpdate.');
        }
        if (HostBodyPatch === null || HostBodyPatch === undefined) {
            throw new Error('Required parameter HostBodyPatch was null or undefined when calling projectsHostsUpdate.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/hosts/${this.configuration.encodeParam({ name: "hostname", value: hostname, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined })}`;
        return this.httpClient.request('put', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: HostBodyPatch,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsHostsVerifyCreate(project_id, hostname, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsHostsVerifyCreate.');
        }
        if (hostname === null || hostname === undefined) {
            throw new Error('Required parameter hostname was null or undefined when calling projectsHostsVerifyCreate.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/hosts/${this.configuration.encodeParam({ name: "hostname", value: hostname, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined })}/verify`;
        return this.httpClient.request('post', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HostsService, deps: [{ token: i1.HttpClient }, { token: BASE_PATH, optional: true }, { token: Configuration, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HostsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HostsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [BASE_PATH]
                }] }, { type: Configuration, decorators: [{
                    type: Optional
                }] }]; } });

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
/* tslint:disable:no-unused-variable member-ordering */
class OrganisationsService {
    httpClient;
    basePath = 'https://chaos.qernal.com/v1';
    defaultHeaders = new HttpHeaders();
    configuration = new Configuration();
    encoder;
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    // @ts-ignore
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substring(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    organisationsCreate(OrganisationBody, observe = 'body', reportProgress = false, options) {
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/organisations`;
        return this.httpClient.request('post', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: OrganisationBody,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    organisationsDelete(organisation_id, observe = 'body', reportProgress = false, options) {
        if (organisation_id === null || organisation_id === undefined) {
            throw new Error('Required parameter organisation_id was null or undefined when calling organisationsDelete.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/organisations/${this.configuration.encodeParam({ name: "organisation_id", value: organisation_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}`;
        return this.httpClient.request('delete', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    organisationsGet(organisation_id, observe = 'body', reportProgress = false, options) {
        if (organisation_id === null || organisation_id === undefined) {
            throw new Error('Required parameter organisation_id was null or undefined when calling organisationsGet.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/organisations/${this.configuration.encodeParam({ name: "organisation_id", value: organisation_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    organisationsList(page, observe = 'body', reportProgress = false, options) {
        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, page, 'page');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/organisations`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            params: localVarQueryParameters,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    organisationsUpdate(organisation_id, OrganisationBody, observe = 'body', reportProgress = false, options) {
        if (organisation_id === null || organisation_id === undefined) {
            throw new Error('Required parameter organisation_id was null or undefined when calling organisationsUpdate.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/organisations/${this.configuration.encodeParam({ name: "organisation_id", value: organisation_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}`;
        return this.httpClient.request('put', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: OrganisationBody,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OrganisationsService, deps: [{ token: i1.HttpClient }, { token: BASE_PATH, optional: true }, { token: Configuration, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OrganisationsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: OrganisationsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [BASE_PATH]
                }] }, { type: Configuration, decorators: [{
                    type: Optional
                }] }]; } });

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
/* tslint:disable:no-unused-variable member-ordering */
class ProjectsService {
    httpClient;
    basePath = 'https://chaos.qernal.com/v1';
    defaultHeaders = new HttpHeaders();
    configuration = new Configuration();
    encoder;
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    // @ts-ignore
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substring(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    organisationsProjectsList(organisation_id, page, observe = 'body', reportProgress = false, options) {
        if (organisation_id === null || organisation_id === undefined) {
            throw new Error('Required parameter organisation_id was null or undefined when calling organisationsProjectsList.');
        }
        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, page, 'page');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/organisations/${this.configuration.encodeParam({ name: "organisation_id", value: organisation_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/projects`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            params: localVarQueryParameters,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsCreate(ProjectBody, observe = 'body', reportProgress = false, options) {
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects`;
        return this.httpClient.request('post', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: ProjectBody,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsDelete(project_id, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsDelete.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}`;
        return this.httpClient.request('delete', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsGet(project_id, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsGet.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsList(page, observe = 'body', reportProgress = false, options) {
        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, page, 'page');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            params: localVarQueryParameters,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsUpdate(project_id, ProjectBodyPatch, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsUpdate.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}`;
        return this.httpClient.request('put', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: ProjectBodyPatch,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ProjectsService, deps: [{ token: i1.HttpClient }, { token: BASE_PATH, optional: true }, { token: Configuration, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ProjectsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ProjectsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [BASE_PATH]
                }] }, { type: Configuration, decorators: [{
                    type: Optional
                }] }]; } });

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
/* tslint:disable:no-unused-variable member-ordering */
class SecretsService {
    httpClient;
    basePath = 'https://chaos.qernal.com/v1';
    defaultHeaders = new HttpHeaders();
    configuration = new Configuration();
    encoder;
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    // @ts-ignore
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substring(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    projectsSecretsCreate(project_id, SecretBody, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsSecretsCreate.');
        }
        if (SecretBody === null || SecretBody === undefined) {
            throw new Error('Required parameter SecretBody was null or undefined when calling projectsSecretsCreate.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/secrets`;
        return this.httpClient.request('post', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: SecretBody,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsSecretsDelete(project_id, secret_name, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsSecretsDelete.');
        }
        if (secret_name === null || secret_name === undefined) {
            throw new Error('Required parameter secret_name was null or undefined when calling projectsSecretsDelete.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/secrets/${this.configuration.encodeParam({ name: "secret_name", value: secret_name, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined })}`;
        return this.httpClient.request('delete', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsSecretsGet(project_id, secret_name, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsSecretsGet.');
        }
        if (secret_name === null || secret_name === undefined) {
            throw new Error('Required parameter secret_name was null or undefined when calling projectsSecretsGet.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/secrets/${this.configuration.encodeParam({ name: "secret_name", value: secret_name, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined })}`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsSecretsList(project_id, page, secret_type, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsSecretsList.');
        }
        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, page, 'page');
        }
        if (secret_type !== undefined && secret_type !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, secret_type, 'secret_type');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/secrets`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            params: localVarQueryParameters,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    projectsSecretsUpdate(project_id, secret_name, SecretBodyPatch, observe = 'body', reportProgress = false, options) {
        if (project_id === null || project_id === undefined) {
            throw new Error('Required parameter project_id was null or undefined when calling projectsSecretsUpdate.');
        }
        if (secret_name === null || secret_name === undefined) {
            throw new Error('Required parameter secret_name was null or undefined when calling projectsSecretsUpdate.');
        }
        if (SecretBodyPatch === null || SecretBodyPatch === undefined) {
            throw new Error('Required parameter SecretBodyPatch was null or undefined when calling projectsSecretsUpdate.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/projects/${this.configuration.encodeParam({ name: "project_id", value: project_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}/secrets/${this.configuration.encodeParam({ name: "secret_name", value: secret_name, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined })}`;
        return this.httpClient.request('put', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: SecretBodyPatch,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SecretsService, deps: [{ token: i1.HttpClient }, { token: BASE_PATH, optional: true }, { token: Configuration, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SecretsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SecretsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [BASE_PATH]
                }] }, { type: Configuration, decorators: [{
                    type: Optional
                }] }]; } });

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
/* tslint:disable:no-unused-variable member-ordering */
class TokensService {
    httpClient;
    basePath = 'https://chaos.qernal.com/v1';
    defaultHeaders = new HttpHeaders();
    configuration = new Configuration();
    encoder;
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    // @ts-ignore
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substring(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    authTokensCreate(AuthTokenBody, observe = 'body', reportProgress = false, options) {
        if (AuthTokenBody === null || AuthTokenBody === undefined) {
            throw new Error('Required parameter AuthTokenBody was null or undefined when calling authTokensCreate.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/auth/tokens`;
        return this.httpClient.request('post', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: AuthTokenBody,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    authTokensDelete(token_id, observe = 'body', reportProgress = false, options) {
        if (token_id === null || token_id === undefined) {
            throw new Error('Required parameter token_id was null or undefined when calling authTokensDelete.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/auth/tokens/${this.configuration.encodeParam({ name: "token_id", value: token_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}`;
        return this.httpClient.request('delete', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    authTokensGet(token_id, observe = 'body', reportProgress = false, options) {
        if (token_id === null || token_id === undefined) {
            throw new Error('Required parameter token_id was null or undefined when calling authTokensGet.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/auth/tokens/${this.configuration.encodeParam({ name: "token_id", value: token_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    authTokensList(page, observe = 'body', reportProgress = false, options) {
        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, page, 'page');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/auth/tokens`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            params: localVarQueryParameters,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    authTokensUpdate(token_id, AuthTokenPatch, observe = 'body', reportProgress = false, options) {
        if (token_id === null || token_id === undefined) {
            throw new Error('Required parameter token_id was null or undefined when calling authTokensUpdate.');
        }
        if (AuthTokenPatch === null || AuthTokenPatch === undefined) {
            throw new Error('Required parameter AuthTokenPatch was null or undefined when calling authTokensUpdate.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (cookie) required
        localVarCredential = this.configuration.lookupCredential('cookie');
        if (localVarCredential) {
        }
        // authentication (token) required
        localVarCredential = this.configuration.lookupCredential('token');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let localVarHttpContext = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/auth/tokens/${this.configuration.encodeParam({ name: "token_id", value: token_id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: "uuid" })}`;
        return this.httpClient.request('put', `${this.configuration.basePath}${localVarPath}`, {
            context: localVarHttpContext,
            body: AuthTokenPatch,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TokensService, deps: [{ token: i1.HttpClient }, { token: BASE_PATH, optional: true }, { token: Configuration, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TokensService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TokensService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [BASE_PATH]
                }] }, { type: Configuration, decorators: [{
                    type: Optional
                }] }]; } });

const APIS = [HostsService, OrganisationsService, ProjectsService, SecretsService, TokensService];

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
const HostVerificationStatus = {
    pending: 'pending',
    completed: 'completed',
    failed: 'failed'
};

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
const SecretCreateType = {
    registry: 'registry',
    certificate: 'certificate',
    environment: 'environment'
};

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
const SecretMetaType = {
    registry: 'registry',
    certificate: 'certificate',
    environment: 'environment',
    dek: 'dek'
};

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

class ChaosApiModule {
    static forRoot(configurationFactory) {
        return {
            ngModule: ChaosApiModule,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    }
    constructor(parentModule, http) {
        if (parentModule) {
            throw new Error('ChaosApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ChaosApiModule, deps: [{ token: ChaosApiModule, optional: true, skipSelf: true }, { token: i1.HttpClient, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ChaosApiModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ChaosApiModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ChaosApiModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    declarations: [],
                    exports: [],
                    providers: []
                }]
        }], ctorParameters: function () { return [{ type: ChaosApiModule, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i1.HttpClient, decorators: [{
                    type: Optional
                }] }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { APIS, BASE_PATH, COLLECTION_FORMATS, ChaosApiModule, Configuration, HostVerificationStatus, HostsService, OrganisationsService, ProjectsService, SecretCreateType, SecretMetaType, SecretsService, TokensService };
//# sourceMappingURL=openapi-chaos-typescript-angular-client.mjs.map
