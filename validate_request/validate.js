/* A Note about the $request_body Variable

    The JavaScript function validater uses the $request_body variable to 
    perform JSON parsing. However, NGINX does not populate this variable 
    by default, and simply streams the request body to the backend without 
    making intermediate copies. 
    By using the mirror directive inside the / API, we create a copy of the 
    client request, and consequently populate the $request_body variable.
*/

function validater(r) {
    try {
        JSON.parse(r.requestBody);
        return 'internal';
    } catch (error) {
        return '415';
    }
}
