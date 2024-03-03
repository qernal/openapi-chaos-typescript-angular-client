import { ModuleWithProviders } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class ChaosApiModule {
    static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ChaosApiModule>;
    constructor(parentModule: ChaosApiModule, http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<ChaosApiModule, [{ optional: true; skipSelf: true; }, { optional: true; }]>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ChaosApiModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ChaosApiModule>;
}
