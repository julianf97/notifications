// Define la respuesta que devuelve la API al crear una notificación
export class CreateNotificationResponseDto {
  // Identificador de la notificación creada
  id!: number;

  // Título de la notificación
  title!: string;

  // Contenido de la notificación
  content!: string;

  // Canal utilizado
  channel!: string;

  // Estado del envío
  status!: string;

  // Destinatario utilizado en el envío
  recipient?: string;

  // Fecha de creación
  createdAt!: Date;
}