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
export var LogLog;
(function (LogLog) {
    LogLog.StreamEnum = {
        stdout: 'stdout',
        stderr: 'stderr'
    };
    LogLog.KindEnum = {
        event: 'event',
        log: 'log'
    };
    LogLog.TypeEnum = {
        info: 'info',
        error: 'error'
    };
})(LogLog || (LogLog = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nTG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbW9kZWwvbG9nTG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFnQ0gsTUFBTSxLQUFXLE1BQU0sQ0FnQnRCO0FBaEJELFdBQWlCLE1BQU07SUFFTixpQkFBVSxHQUFHO1FBQ3RCLE1BQU0sRUFBRSxRQUFzQjtRQUM5QixNQUFNLEVBQUUsUUFBc0I7S0FDakMsQ0FBQztJQUVXLGVBQVEsR0FBRztRQUNwQixLQUFLLEVBQUUsT0FBbUI7UUFDMUIsR0FBRyxFQUFFLEtBQWlCO0tBQ3pCLENBQUM7SUFFVyxlQUFRLEdBQUc7UUFDcEIsSUFBSSxFQUFFLE1BQWtCO1FBQ3hCLEtBQUssRUFBRSxPQUFtQjtLQUM3QixDQUFDO0FBQ04sQ0FBQyxFQWhCZ0IsTUFBTSxLQUFOLE1BQU0sUUFnQnRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDaGFvc1xuICogQ2VudHJhbCBNYW5hZ2VtZW50IEFQSSAtIHB1YmxpY2x5IGV4cG9zZWQgc2V0IG9mIEFQSXMgZm9yIG1hbmFnaW5nIGRlcGxveW1lbnRzXG4gKlxuICogVGhlIHZlcnNpb24gb2YgdGhlIE9wZW5BUEkgZG9jdW1lbnQ6IDEuMC4wXG4gKiBDb250YWN0OiBzdXBwb3J0QHFlcm5hbC5jb21cbiAqXG4gKiBOT1RFOiBUaGlzIGNsYXNzIGlzIGF1dG8gZ2VuZXJhdGVkIGJ5IE9wZW5BUEkgR2VuZXJhdG9yIChodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2gpLlxuICogaHR0cHM6Ly9vcGVuYXBpLWdlbmVyYXRvci50ZWNoXG4gKiBEbyBub3QgZWRpdCB0aGUgY2xhc3MgbWFudWFsbHkuXG4gKi9cblxuXG4vKipcbiAqIExvZyBpdGVtXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTG9nTG9nIHsgXG4gICAgLyoqXG4gICAgICogV2hpY2ggbG9nIHN0cmVhbVxuICAgICAqL1xuICAgIHN0cmVhbT86IExvZ0xvZy5TdHJlYW1FbnVtO1xuICAgIC8qKlxuICAgICAqIElmIHRoaXMgd2FzIGFuIGV2ZW50IG9uIHRoZSBmdW5jdGlvbiBvciBhIGxvZyBsaW5lXG4gICAgICovXG4gICAga2luZD86IExvZ0xvZy5LaW5kRW51bTtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBsYWJlbHNcbiAgICAgKi9cbiAgICBsYWJlbHM/OiBBcnJheTxzdHJpbmc+O1xuICAgIC8qKlxuICAgICAqIExvZyBsaW5lIHR5cGVcbiAgICAgKi9cbiAgICB0eXBlPzogTG9nTG9nLlR5cGVFbnVtO1xuICAgIC8qKlxuICAgICAqIExvZyBsaW5lXG4gICAgICovXG4gICAgbGluZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgZGF0ZS90aW1lIHRoYXQgdGhpcyBsb2cgd2FzIGdlbmVyYXRlZFxuICAgICAqL1xuICAgIHRpbWVzdGFtcD86IHN0cmluZztcbn1cbmV4cG9ydCBuYW1lc3BhY2UgTG9nTG9nIHtcbiAgICBleHBvcnQgdHlwZSBTdHJlYW1FbnVtID0gJ3N0ZG91dCcgfCAnc3RkZXJyJztcbiAgICBleHBvcnQgY29uc3QgU3RyZWFtRW51bSA9IHtcbiAgICAgICAgc3Rkb3V0OiAnc3Rkb3V0JyBhcyBTdHJlYW1FbnVtLFxuICAgICAgICBzdGRlcnI6ICdzdGRlcnInIGFzIFN0cmVhbUVudW1cbiAgICB9O1xuICAgIGV4cG9ydCB0eXBlIEtpbmRFbnVtID0gJ2V2ZW50JyB8ICdsb2cnO1xuICAgIGV4cG9ydCBjb25zdCBLaW5kRW51bSA9IHtcbiAgICAgICAgZXZlbnQ6ICdldmVudCcgYXMgS2luZEVudW0sXG4gICAgICAgIGxvZzogJ2xvZycgYXMgS2luZEVudW1cbiAgICB9O1xuICAgIGV4cG9ydCB0eXBlIFR5cGVFbnVtID0gJ2luZm8nIHwgJ2Vycm9yJztcbiAgICBleHBvcnQgY29uc3QgVHlwZUVudW0gPSB7XG4gICAgICAgIGluZm86ICdpbmZvJyBhcyBUeXBlRW51bSxcbiAgICAgICAgZXJyb3I6ICdlcnJvcicgYXMgVHlwZUVudW1cbiAgICB9O1xufVxuXG5cbiJdfQ==