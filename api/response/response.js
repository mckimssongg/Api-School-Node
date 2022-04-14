
import { HttpStatusCode } from "../utils/httpStatusCode.js"; //Codigos de respuesta del estado

export const response = {
    /**
     * Plantilla para la respuesta a las
     * peticiones completada y fallidas
     */
    success: (req,res, message,status) => {
        let statusCode = status || HttpStatusCode.OK; 
        let data = message ||'';
        res.status(200).json({
            error: false, 
            status: statusCode,
            body: data,
        });
    },
    
    error: (req,res, message,status) => {
        let statusCode = status || HttpStatusCode.INTERNAL_SERVER_ERROR;
        let data = message ||'Internal server error';
        res.status(statusCode).json({
            error: true, 
            status: statusCode,
            body: data,
        });
    }
}