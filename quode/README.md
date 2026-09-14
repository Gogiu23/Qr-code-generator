# QR Studio

Generador de códigos QR personalizables (colores, forma de puntos, esquinas, logo central) con guardado en la nube vía [Appwrite](https://appwrite.io).

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Configuración de Appwrite

La app usa la API nueva de Appwrite (**TablesDB**: Database → Table → Rows/Columns), no la clásica de Collections/Documents.

1. Copiá `.env.example` a `.env.local` y completá `NEXT_PUBLIC_APPWRITE_ENDPOINT` (ojo, suele ser regional, ej. `https://fra.cloud.appwrite.io/v1`) y `NEXT_PUBLIC_APPWRITE_PROJECT_ID` con los datos de tu proyecto de Appwrite (Overview → arriba a la izquierda).
2. En **Auth → Settings**, confirmá que el método **Email/Password** esté habilitado.
3. En **Overview → Platforms**, agregá una plataforma **Web** con hostname `localhost` (y el dominio real cuando despliegues) — si no, Appwrite rechaza las escrituras por CORS.
4. Creá una base de datos y, dentro, una tabla con estas columnas (los IDs van en `NEXT_PUBLIC_APPWRITE_DATABASE_ID` / `NEXT_PUBLIC_APPWRITE_TABLE_ID` — son los IDs autogenerados, no el nombre que le pusiste):

   | Columna   | Tipo   | Requerido | Notas                          |
   | --------- | ------ | --------- | ------------------------------ |
   | `user_id` | string | sí        | tamaño 255                     |
   | `title`   | string | sí        | tamaño 255                     |
   | `content` | string | sí        | tamaño 2000                    |
   | `options` | string | sí        | tamaño 2000 (JSON serializado) |

   No hace falta una columna `created_at`: la app usa el campo built-in `$createdAt` de cada row para ordenar "Mis QR".

5. En la tabla, andá a **Settings → Row security** y activalo — la app otorga permisos de lectura/escritura por row al usuario dueño (`Permission.read/update/delete(Role.user(...))`) al guardar cada diseño, y sin Row security esos permisos se ignoran.

## Estructura

- `src/app` — rutas de Next.js App Router (`layout.tsx`, `page.tsx`).
- `src/components` — `Navbar`, `AuthModal`, `SavedModal`.
- `src/hooks/useQRCode.ts` — genera y actualiza el QR con [`qr-code-styling`](https://github.com/kozakdenys/qr-code-styling) y expone `download()`.
- `src/lib/appwriteClient.ts` — cliente de Appwrite (`account`, `tablesDB`).
- `src/types/qr.ts` — tipos compartidos.
