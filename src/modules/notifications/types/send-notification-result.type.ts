// Define el resultado que devuelve una estrategia despues de enviar una notificacion
export type SendNotificationResult = {
    // Estado final del envío
    status: 'sent';

    // Destinatario utilizado durante el envío
    recipient?: string;
}