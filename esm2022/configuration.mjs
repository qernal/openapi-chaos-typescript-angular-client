export class Configuration {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0NBLE1BQU0sT0FBTyxhQUFhO0lBQ3RCOztPQUVHO0lBQ0gsT0FBTyxDQUE2QjtJQUNwQyxRQUFRLENBQVU7SUFDbEIsUUFBUSxDQUFVO0lBQ2xCOztPQUVHO0lBQ0gsV0FBVyxDQUEyQjtJQUN0QyxRQUFRLENBQVU7SUFDbEIsZUFBZSxDQUFXO0lBQzFCOztPQUVHO0lBQ0gsT0FBTyxDQUFzQjtJQUM3Qjs7Ozs7O09BTUc7SUFDSCxXQUFXLENBQTJCO0lBQ3RDOzs7O09BSUc7SUFDSCxXQUFXLENBQXlEO0lBRXBFLFlBQVksMEJBQW1ELEVBQUU7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7UUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7UUFDL0MsSUFBSSx1QkFBdUIsQ0FBQyxXQUFXLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7U0FDMUQ7YUFDSTtZQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxJQUFJLHVCQUF1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RCx1REFBdUQ7UUFDdkQsc0VBQXNFO1FBQ3RFLEVBQUU7UUFDRiwyRkFBMkY7UUFFM0YsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsS0FBSyxXQUFXLElBQUksS0FBSyxDQUFDLEtBQUssWUFBWSxJQUFJO1lBQ3pFLENBQUMsQ0FBRSxLQUFLLENBQUMsS0FBYyxDQUFDLFdBQVcsRUFBRTtZQUNyQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUVsQixPQUFPLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBQYXJhbWV0ZXJDb2RlYyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFBhcmFtIH0gZnJvbSAnLi9wYXJhbSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJhdGlvblBhcmFtZXRlcnMge1xuICAgIC8qKlxuICAgICAqICBAZGVwcmVjYXRlZCBTaW5jZSA1LjAuIFVzZSBjcmVkZW50aWFscyBpbnN0ZWFkXG4gICAgICovXG4gICAgYXBpS2V5cz86IHtbIGtleTogc3RyaW5nIF06IHN0cmluZ307XG4gICAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogIEBkZXByZWNhdGVkIFNpbmNlIDUuMC4gVXNlIGNyZWRlbnRpYWxzIGluc3RlYWRcbiAgICAgKi9cbiAgICBhY2Nlc3NUb2tlbj86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xuICAgIGJhc2VQYXRoPzogc3RyaW5nO1xuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGFrZXMgY2FyZSBvZiBlbmNvZGluZyBxdWVyeS0gYW5kIGZvcm0tcGFyYW1ldGVycy5cbiAgICAgKi9cbiAgICBlbmNvZGVyPzogSHR0cFBhcmFtZXRlckNvZGVjO1xuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0IG1ldGhvZCBmb3IgZW5jb2RpbmcgcGF0aCBwYXJhbWV0ZXJzIGluIHZhcmlvdXNcbiAgICAgKiA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL09BSS9PcGVuQVBJLVNwZWNpZmljYXRpb24vYmxvYi9tYWluL3ZlcnNpb25zLzMuMS4wLm1kI3N0eWxlLXZhbHVlc1wiPnN0eWxlczwvYT4uXG4gICAgICogPHA+XG4gICAgICogU2VlIHtAbGluayBSRUFETUUubWR9IGZvciBtb3JlIGRldGFpbHNcbiAgICAgKiA8L3A+XG4gICAgICovXG4gICAgZW5jb2RlUGFyYW0/OiAocGFyYW06IFBhcmFtKSA9PiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGtleXMgYXJlIHRoZSBuYW1lcyBpbiB0aGUgc2VjdXJpdHlTY2hlbWVzIHNlY3Rpb24gb2YgdGhlIE9wZW5BUElcbiAgICAgKiBkb2N1bWVudC4gVGhleSBzaG91bGQgbWFwIHRvIHRoZSB2YWx1ZSB1c2VkIGZvciBhdXRoZW50aWNhdGlvblxuICAgICAqIG1pbnVzIGFueSBzdGFuZGFyZCBwcmVmaXhlcyBzdWNoIGFzICdCYXNpYycgb3IgJ0JlYXJlcicuXG4gICAgICovXG4gICAgY3JlZGVudGlhbHM/OiB7WyBrZXk6IHN0cmluZyBdOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkKX07XG59XG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIHtcbiAgICAvKipcbiAgICAgKiAgQGRlcHJlY2F0ZWQgU2luY2UgNS4wLiBVc2UgY3JlZGVudGlhbHMgaW5zdGVhZFxuICAgICAqL1xuICAgIGFwaUtleXM/OiB7WyBrZXk6IHN0cmluZyBdOiBzdHJpbmd9O1xuICAgIHVzZXJuYW1lPzogc3RyaW5nO1xuICAgIHBhc3N3b3JkPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqICBAZGVwcmVjYXRlZCBTaW5jZSA1LjAuIFVzZSBjcmVkZW50aWFscyBpbnN0ZWFkXG4gICAgICovXG4gICAgYWNjZXNzVG9rZW4/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcbiAgICBiYXNlUGF0aD86IHN0cmluZztcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFRha2VzIGNhcmUgb2YgZW5jb2RpbmcgcXVlcnktIGFuZCBmb3JtLXBhcmFtZXRlcnMuXG4gICAgICovXG4gICAgZW5jb2Rlcj86IEh0dHBQYXJhbWV0ZXJDb2RlYztcbiAgICAvKipcbiAgICAgKiBFbmNvZGluZyBvZiB2YXJpb3VzIHBhdGggcGFyYW1ldGVyXG4gICAgICogPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9PQUkvT3BlbkFQSS1TcGVjaWZpY2F0aW9uL2Jsb2IvbWFpbi92ZXJzaW9ucy8zLjEuMC5tZCNzdHlsZS12YWx1ZXNcIj5zdHlsZXM8L2E+LlxuICAgICAqIDxwPlxuICAgICAqIFNlZSB7QGxpbmsgUkVBRE1FLm1kfSBmb3IgbW9yZSBkZXRhaWxzXG4gICAgICogPC9wPlxuICAgICAqL1xuICAgIGVuY29kZVBhcmFtOiAocGFyYW06IFBhcmFtKSA9PiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGtleXMgYXJlIHRoZSBuYW1lcyBpbiB0aGUgc2VjdXJpdHlTY2hlbWVzIHNlY3Rpb24gb2YgdGhlIE9wZW5BUElcbiAgICAgKiBkb2N1bWVudC4gVGhleSBzaG91bGQgbWFwIHRvIHRoZSB2YWx1ZSB1c2VkIGZvciBhdXRoZW50aWNhdGlvblxuICAgICAqIG1pbnVzIGFueSBzdGFuZGFyZCBwcmVmaXhlcyBzdWNoIGFzICdCYXNpYycgb3IgJ0JlYXJlcicuXG4gICAgICovXG4gICAgY3JlZGVudGlhbHM6IHtbIGtleTogc3RyaW5nIF06IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQpfTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzOiBDb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgICAgIHRoaXMuYXBpS2V5cyA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmFwaUtleXM7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy51c2VybmFtZTtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLnBhc3N3b3JkO1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMuYWNjZXNzVG9rZW47XG4gICAgICAgIHRoaXMuYmFzZVBhdGggPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5iYXNlUGF0aDtcbiAgICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgIHRoaXMuZW5jb2RlciA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmVuY29kZXI7XG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uUGFyYW1ldGVycy5lbmNvZGVQYXJhbSkge1xuICAgICAgICAgICAgdGhpcy5lbmNvZGVQYXJhbSA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmVuY29kZVBhcmFtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmNvZGVQYXJhbSA9IHBhcmFtID0+IHRoaXMuZGVmYXVsdEVuY29kZVBhcmFtKHBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlndXJhdGlvblBhcmFtZXRlcnMuY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5jcmVkZW50aWFscztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXQgZGVmYXVsdCB0b2tlbiBjcmVkZW50aWFsXG4gICAgICAgIGlmICghdGhpcy5jcmVkZW50aWFsc1sndG9rZW4nXSkge1xuICAgICAgICAgICAgdGhpcy5jcmVkZW50aWFsc1sndG9rZW4nXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuYWNjZXNzVG9rZW4gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmFjY2Vzc1Rva2VuKClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXQgZGVmYXVsdCBjb29raWUgY3JlZGVudGlhbFxuICAgICAgICBpZiAoIXRoaXMuY3JlZGVudGlhbHNbJ2Nvb2tpZSddKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWRlbnRpYWxzWydjb29raWUnXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcGlLZXlzID09PSBudWxsIHx8IHRoaXMuYXBpS2V5cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBpS2V5c1snY29va2llJ10gfHwgdGhpcy5hcGlLZXlzWydxZXJuYWxfa3JhdG9zX3Nlc3Npb24nXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IHRoZSBjb3JyZWN0IGNvbnRlbnQtdHlwZSB0byB1c2UgZm9yIGEgcmVxdWVzdC5cbiAgICAgKiBVc2VzIHtAbGluayBDb25maWd1cmF0aW9uI2lzSnNvbk1pbWV9IHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBjb250ZW50LXR5cGUuXG4gICAgICogSWYgbm8gY29udGVudCB0eXBlIGlzIGZvdW5kIHJldHVybiB0aGUgZmlyc3QgZm91bmQgdHlwZSBpZiB0aGUgY29udGVudFR5cGVzIGlzIG5vdCBlbXB0eVxuICAgICAqIEBwYXJhbSBjb250ZW50VHlwZXMgLSB0aGUgYXJyYXkgb2YgY29udGVudCB0eXBlcyB0aGF0IGFyZSBhdmFpbGFibGUgZm9yIHNlbGVjdGlvblxuICAgICAqIEByZXR1cm5zIHRoZSBzZWxlY3RlZCBjb250ZW50LXR5cGUgb3IgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpZiBubyBzZWxlY3Rpb24gY291bGQgYmUgbWFkZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0SGVhZGVyQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlczogc3RyaW5nW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoY29udGVudFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHR5cGUgPSBjb250ZW50VHlwZXMuZmluZCgoeDogc3RyaW5nKSA9PiB0aGlzLmlzSnNvbk1pbWUoeCkpO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudFR5cGVzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgY29ycmVjdCBhY2NlcHQgY29udGVudC10eXBlIHRvIHVzZSBmb3IgYSByZXF1ZXN0LlxuICAgICAqIFVzZXMge0BsaW5rIENvbmZpZ3VyYXRpb24jaXNKc29uTWltZX0gdG8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IGFjY2VwdCBjb250ZW50LXR5cGUuXG4gICAgICogSWYgbm8gY29udGVudCB0eXBlIGlzIGZvdW5kIHJldHVybiB0aGUgZmlyc3QgZm91bmQgdHlwZSBpZiB0aGUgY29udGVudFR5cGVzIGlzIG5vdCBlbXB0eVxuICAgICAqIEBwYXJhbSBhY2NlcHRzIC0gdGhlIGFycmF5IG9mIGNvbnRlbnQgdHlwZXMgdGhhdCBhcmUgYXZhaWxhYmxlIGZvciBzZWxlY3Rpb24uXG4gICAgICogQHJldHVybnMgdGhlIHNlbGVjdGVkIGNvbnRlbnQtdHlwZSBvciA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IGlmIG5vIHNlbGVjdGlvbiBjb3VsZCBiZSBtYWRlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RIZWFkZXJBY2NlcHQoYWNjZXB0czogc3RyaW5nW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoYWNjZXB0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0eXBlID0gYWNjZXB0cy5maW5kKCh4OiBzdHJpbmcpID0+IHRoaXMuaXNKc29uTWltZSh4KSk7XG4gICAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2NlcHRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlbiBNSU1FIGlzIGEgSlNPTiBNSU1FLlxuICAgICAqIEpTT04gTUlNRSBleGFtcGxlczpcbiAgICAgKiAgIGFwcGxpY2F0aW9uL2pzb25cbiAgICAgKiAgIGFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGOFxuICAgICAqICAgQVBQTElDQVRJT04vSlNPTlxuICAgICAqICAgYXBwbGljYXRpb24vdm5kLmNvbXBhbnkranNvblxuICAgICAqIEBwYXJhbSBtaW1lIC0gTUlNRSAoTXVsdGlwdXJwb3NlIEludGVybmV0IE1haWwgRXh0ZW5zaW9ucylcbiAgICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIGdpdmVuIE1JTUUgaXMgSlNPTiwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBpc0pzb25NaW1lKG1pbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBqc29uTWltZTogUmVnRXhwID0gbmV3IFJlZ0V4cCgnXihhcHBsaWNhdGlvblxcL2pzb258W147LyBcXHRdK1xcL1teOy8gXFx0XStbK11qc29uKVsgXFx0XSooOy4qKT8kJywgJ2knKTtcbiAgICAgICAgcmV0dXJuIG1pbWUgIT09IG51bGwgJiYgKGpzb25NaW1lLnRlc3QobWltZSkgfHwgbWltZS50b0xvd2VyQ2FzZSgpID09PSAnYXBwbGljYXRpb24vanNvbi1wYXRjaCtqc29uJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvb2t1cENyZWRlbnRpYWwoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY3JlZGVudGlhbHNba2V5XTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyB2YWx1ZSgpXG4gICAgICAgICAgICA6IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdEVuY29kZVBhcmFtKHBhcmFtOiBQYXJhbSk6IHN0cmluZyB7XG4gICAgICAgIC8vIFRoaXMgaW1wbGVtZW50YXRpb24gZXhpc3RzIGFzIGZhbGxiYWNrIGZvciBtaXNzaW5nIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgLy8gYW5kIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB0byBvbGRlciB0eXBlc2NyaXB0LWFuZ3VsYXIgZ2VuZXJhdG9yIHZlcnNpb25zLlxuICAgICAgICAvLyBJdCBvbmx5IHdvcmtzIGZvciB0aGUgJ3NpbXBsZScgcGFyYW1ldGVyIHN0eWxlLlxuICAgICAgICAvLyBEYXRlLWhhbmRsaW5nIG9ubHkgd29ya3MgZm9yIHRoZSAnZGF0ZS10aW1lJyBmb3JtYXQuXG4gICAgICAgIC8vIEFsbCBvdGhlciBzdHlsZXMgYW5kIERhdGUtZm9ybWF0cyBhcmUgcHJvYmFibHkgaGFuZGxlZCBpbmNvcnJlY3RseS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQnV0OiBpZiB0aGF0J3MgYWxsIHlvdSBuZWVkIChpLmUuOiB0aGUgbW9zdCBjb21tb24gdXNlLWNhc2UpOiBubyBuZWVkIGZvciBjdXN0b21pemF0aW9uIVxuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFyYW0uZGF0YUZvcm1hdCA9PT0gJ2RhdGUtdGltZScgJiYgcGFyYW0udmFsdWUgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgICA/IChwYXJhbS52YWx1ZSBhcyBEYXRlKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICA6IHBhcmFtLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxufVxuIl19