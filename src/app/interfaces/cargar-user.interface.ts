import { Usuario } from "../models/usuario.model";

export interface CargarUser {
  total: number,
  usuarios: Usuario[]
}
