// Define la respuesta al eliminar una notificación
export type DeleteNotificationResponse = {
  // Mensaje que confirma la eliminación
  message: string;

  // Id de la notificación eliminada
  id: number;
};