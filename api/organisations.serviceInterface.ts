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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { BadRequestResponse } from '../model/models';
import { ConflictResponse } from '../model/models';
import { DeletedResponse } from '../model/models';
import { ListOrganisationResponse } from '../model/models';
import { NotFoundResponse } from '../model/models';
import { OrganisationBody } from '../model/models';
import { OrganisationResponse } from '../model/models';
import { OrganisationsListPageParameter } from '../model/models';
import { UnauthorisedResponse } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface OrganisationsServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Create organisations
     * Create an organisation
     * @param OrganisationBody Create/Update any field
     */
    organisationsCreate(OrganisationBody?: OrganisationBody, extraHttpRequestParams?: any): Observable<OrganisationResponse>;

    /**
     * Delete an organisation
     * Delete organisation, this will also delete all the resources within the organisation
     * @param organisation_id Organisation ID reference
     */
    organisationsDelete(organisation_id: string, extraHttpRequestParams?: any): Observable<DeletedResponse>;

    /**
     * Get an organisation
     * Get a single organisation
     * @param organisation_id Organisation ID reference
     */
    organisationsGet(organisation_id: string, extraHttpRequestParams?: any): Observable<OrganisationResponse>;

    /**
     * List organisations
     * List organisations
     * @param page Query parameters for pagination
     */
    organisationsList(page?: OrganisationsListPageParameter, extraHttpRequestParams?: any): Observable<ListOrganisationResponse>;

    /**
     * Update an organisation
     * Update an organisation
     * @param organisation_id Organisation ID reference
     * @param OrganisationBody Create/Update any field
     */
    organisationsUpdate(organisation_id: string, OrganisationBody?: OrganisationBody, extraHttpRequestParams?: any): Observable<OrganisationResponse>;

}
