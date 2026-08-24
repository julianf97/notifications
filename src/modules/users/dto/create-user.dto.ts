export class CreateUserDto {

    // Guarda el identificador unico que viene de Auth0. con ! le decimos a Typescript que esta propiedad va inicializarse despues
    auth0Id!: string;

    // Guarda el email del usuario
    email!: string;

}