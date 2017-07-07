/**
 * function create a general response for all http methods
 *
 * @param response {ServerResponse} - HttpResponse to set the status and json response body
 * @param error - error, that cause while executing some request
 * @param result - success result
 */
module.exports.response = function(response, error, result) {
    "use strict";

    let response_body = { };

    if (error) {
        response_body.error = {
            code: error.code || 500,
            message: error.message || 'Internal service error'
        };
    } else {
        response_body.result = result;
    }

    response
        .status(200)
        .json(response_body);
};